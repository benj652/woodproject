import torch
import torch.nn as nn
import torch.nn.functional as F
import torchvision
import torchvision.transforms as transforms

# Constents
TRAINING_PATH ='./data/wood_dataset/Train'
TESTING_PATH ='./data/wood_dataset/Test'
BATCH_SIZE = 32
MEAN = [0.6025, 0.5978, 0.5789]
STD = [0.0417, 0.0466, 0.0522]
LEARNING_RATE = 0.002
EPOCHS = 50
TREE_LABELS = {
    0: 'common beech',
    1: 'common walnut',
    2: 'chestnut',
    3: 'austrian oak',
    4: 'common alder',
    5: 'manna ash',
    6: 'european spruce',
    7: 'ailanthus',
    8: 'varnish tree',
    9: 'black locust',
    10: 'mediterranean cypress',
    11: 'sycamore'
}

# Load data
training_transforms = transforms.Compose(
    [transforms.ToTensor(), transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(10), transforms.Normalize(MEAN, STD)])
testing_transforms = transforms.Compose(
    [transforms.ToTensor(), transforms.Normalize(MEAN, STD)])
train_dataset = torchvision.datasets.ImageFolder(
    root = TRAINING_PATH, transform=training_transforms)
test_dataset = torchvision.datasets.ImageFolder(
    root = TESTING_PATH, transform=testing_transforms)
train_loader = torch.utils.data.DataLoader(
    dataset = train_dataset, batch_size=BATCH_SIZE, shuffle = True)
test_loader = torch.utils.data.DataLoader(
    dataset = test_dataset, batch_size=BATCH_SIZE, shuffle = False)

class TextureCNN(nn.Module):
    def __init__(self, num_classes=12):
        super(TextureCNN, self).__init__()
        self.conv1 = nn.Conv2d(in_channels=3, out_channels=32, kernel_size=3, stride=1, padding=1)
        self.conv2 = nn.Conv2d(in_channels=32, out_channels=64, kernel_size=3, stride=1, padding=1)
        self.conv3 = nn.Conv2d(in_channels=64, out_channels=128, kernel_size=3, stride=1, padding=1)
        self.conv4 = nn.Conv2d(in_channels=128, out_channels=256, kernel_size=3, stride=1, padding=1)
        self.conv5 = nn.Conv2d(in_channels=256, out_channels=512, kernel_size=3, stride=1, padding=1)
        
        # Assuming input images are 200x200
        # After conv1 and maxpool: 100x100
        # After conv2 and maxpool: 50x50
        # After conv3 and maxpool: 25x25
        # After conv4 and maxpool: 12x12
        # After conv5 and maxpool: 6x6
        
        self.fc1 = nn.Linear(in_features=512*6*6, out_features=1024)
        self.fc2 = nn.Linear(in_features=1024, out_features=512)
        self.fc3 = nn.Linear(in_features=512, out_features=num_classes)

    def forward(self, x):
        x = F.relu(self.conv1(x))
        x = F.max_pool2d(x, 2)
        x = F.relu(self.conv2(x))
        x = F.max_pool2d(x, 2)
        x = F.relu(self.conv3(x))
        x = F.max_pool2d(x, 2)
        x = F.relu(self.conv4(x))
        x = F.max_pool2d(x, 2)
        x = F.relu(self.conv5(x))
        x = F.max_pool2d(x, 2)
        
        x = x.view(x.size(0), -1)  # Flatten the tensor
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        return x


def train_model():
    '''Trains the wood model using the resnet-18 with transfer learning'''
    num_images = len(train_loader)
    model = TextureCNN()#torchvision.models.resnet50(pretrained = True)
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.RAdam(
        params = model.parameters(), lr=LEARNING_RATE, weight_decay=1e-4) # weighted decay
    scheduler = torch.optim.lr_scheduler.StepLR(optimizer, step_size=7, gamma=0.5)
    #scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(optimizer, mode='min', factor=0.5, patience=3, verbose=True)

    #model.fc=nn.Linear(model.fc.in_features, 12)

    for epoch in range(EPOCHS):
        model.train()
        for i, (images, labels) in enumerate(train_loader):
            output = model(images)
            acc = ((torch.argmax(output, 1) == labels).sum() / BATCH_SIZE).item()
            loss = criterion(output, labels)
            optimizer.zero_grad()
            loss.backward()
            # nn.utils.clip_grad_norm_(model.parameters(), 1.0)
            optimizer.step()
            if i % 10 == 0:
                print('-------------------------')
                print(f'Epoch: {epoch+1}/{EPOCHS}, Step: {i+1}/{num_images}')
                print(f'loss: {loss.item():.4f}, Acc: {(acc*100):.2f}%')
        acc = test_model(model)
        scheduler.step()
    return model

def test_model(model):
    model.eval()    
    with torch.no_grad():
        correct=0
        samples=0
        class_correct = [0 for i in range(12)]
        class_samples = [0 for i in range(12)]
        for images, labels in test_loader:
            outputs=model(images)
            _, predicted=torch.max(outputs, 1)
            samples+=labels.size(0)
            correct+=(predicted==labels).sum().item()
            for i in range(len(images)):
                label=labels[i]
                pred=predicted[i]
                if label==pred:
                    class_correct[label]+=1
                class_samples[label]+=1

    acc= 100* correct/samples
    print(f"acc:{acc:.2f}%")
    for i in range(12):
        acc=100*class_correct[i]/class_samples[i]
        print(f"{TREE_LABELS[i]}: {acc:.2f}%")
    return acc

def main():
    wood_model=train_model()
    torch.save(wood_model.state_dict(), 'wood_model_wd_2.pth')
    test_model(wood_model)

if __name__ == '__main__':
    main()
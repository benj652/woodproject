import torch
import torch.nn as nn
import torch.nn.functional as F
import torchvision.transforms as transforms
from PIL import Image
import io

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
    
MEAN = [0.6025, 0.5978, 0.5789]
STD = [0.0417, 0.0466, 0.0522]

MODEL_PATH = './training/wood_model_normal.pth'
loaded_model = TextureCNN()
loaded_model.load_state_dict(torch.load(MODEL_PATH))
loaded_model.eval()

image_transforms = transforms.Compose(
    [transforms.Resize((200,200)), transforms.ToTensor(), 
     transforms.Normalize(MEAN, STD)])

def transform_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes))
    return image_transforms(image).unsqueeze(0)

def get_prediction(image):
    with torch.no_grad():
        outputs = loaded_model(image)
        confidence = F.softmax(outputs)[0]
        _, predicted = torch.max(outputs.data,1)
    return [predicted.item(), f'{(confidence[predicted]*100).item():.2f}%']
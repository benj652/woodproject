import os
import torch
import torchvision
import torchvision.transforms as transforms
import matplotlib.pyplot as plt


def get_mean_std(data_dir, batch_size):
    transform = transforms.Compose([transforms.ToTensor()])
    dataset = torchvision.datasets.ImageFolder(root=data_dir, transform=transform)
    loader = torch.utils.data.DataLoader(dataset=dataset, batch_size=batch_size, shuffle=True)

    mean = torch.zeros(3)
    std = torch.zeros(3)
    total_images = 0

    for images, _ in loader:
        batch_size = images.size(0)
        images_resized = images.view(batch_size, images.size(1), -1)

        mean += images_resized.mean(2).sum(0)
        std += images_resized.std(2).sum(0)
        total_images += batch_size

    mean /= total_images
    std /= total_images

    return mean, std


def plot_images(data_dir, batch_size, tree_labels, num_rows, num_cols):
    transform = transforms.Compose([transforms.ToTensor()])
    dataset = torchvision.datasets.ImageFolder(root=data_dir, transform=transform)
    loader = torch.utils.data.DataLoader(dataset=dataset, batch_size=batch_size, shuffle=True)

    fig, axes = plt.subplots(num_rows, num_cols)
    fig.subplots_adjust(left=0.1, right=0.9, top=0.9, bottom=0.1, wspace=0.4, hspace=0.4)

    for i in range(num_rows):
        for j in range(num_cols):
            samples, labels = next(iter(loader))
            axes[i][j].set_title(tree_labels[labels[j].item()])
            axes[i][j].imshow(samples[j][0])
            axes[i][j].set_xticks([])
            axes[i][j].set_yticks([])

    plt.show()


if __name__ == '__main__':
    data_dir = './data/wood_dataset/Train'
    batch_size = 32
    tree_labels = {
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

    mean, std = get_mean_std(data_dir, batch_size)
    print(mean)
    print(std)

    plot_images(data_dir, batch_size, tree_labels, 4, 4)

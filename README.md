# Tree Species Identification

This is a web application that allows users to identify tree species based on the texture of thier wood. The application uses a convolutional neural network (CNN) to classify the images into one of 12 different tree species.

## Running the application

To run this application, you will need to have the following .env variables set:

- SECRET_KEY: a secret key for the flask app
- REDIS_ENV: the location of the redis instance (e.g. redis://127.0.0.1:6379)

Once the .env variables are set, you can run the application with the following commands:

## How to use

1. Take a picture of wood with your phone or camera.
2. Upload the image to the application.
3. The application will then identify the tree species based on the image.

## How it works

The application uses a CNN to classify the images. The CNN is trained on a dataset of images of different tree species. When a new image is uploaded, the CNN is used to predict which tree species it is.

## Tree Species

The application can identify the following tree species:

- Common Beech
- Common Walnut
- Chestnut
- Austrian Oak
- Common Alder
- Manna Ash
- European Spruce
- Ailanthus
- Varnish Tree
- Black Locust
- Mediteranan Cypress
- Sycamore

## Limitations

The application is not 100% accurate. It may not be able to identify some images correctly. Additionally, the application may not be able to identify images of tree species that are not in the training dataset.

## Future Work

- Improve the accuracy of the application
- Add more tree species to the training dataset
- Allow users to upload multiple images at once
- Implement a user feedback system to improve the accuracy of the application

## Technologies Used

- React
- Flask
- Pytorch
- Docker

from flask import request, jsonify
from utils import get_prediction, transform_image


TREE_LABELS = {
    0: 'Common Beech',
    1: 'Wommon Walnut',
    2: 'Chestnut',
    3: 'Austrian Oak',
    4: 'Common Alder',
    5: 'Manna Ash',
    6: 'European Spruce',
    7: 'Ailanthus',
    8: 'Varnish Tree',
    9: 'Black Locust',
    10: 'Mediterranean Cypress',
    11: 'Sycamore'
}
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file_type(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def predict():
    if request.method == 'POST':
        file = request.files.get('file')
        if file is None or file.filename == "":
            return jsonify({
                'prediction': 
                'error, no file'
                })
        if not allowed_file_type(file.filename):
            return jsonify({
                'prediction': 
                'error, file not supported'
                })
        try:
            image_bytes = file.read()
            transformed_image = transform_image(image_bytes)
            prediction=get_prediction(transformed_image)
            return jsonify({
                'prediction':TREE_LABELS[prediction[0]], 
                'confidence':prediction[1], 'id':prediction[0]
                })

        except:
            return jsonify({
                'prediction': 
                'error during prediction'
                })
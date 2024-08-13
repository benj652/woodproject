from flask import request, jsonify
from utils import get_prediction, transform_image


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
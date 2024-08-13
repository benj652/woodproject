from flask import Blueprint
from controllers import predict

prediction_bp = Blueprint('prediction', __name__)

@prediction_bp.route('/predict', methods=['POST'])
def handle_predict():
    return predict()

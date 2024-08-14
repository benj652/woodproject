from flask import Blueprint
from controllers import predict
from middleware import login_required

prediction_bp = Blueprint('prediction', __name__)

@prediction_bp.route('/predict', methods=['POST'])
@login_required
def handle_predict():
    return predict()

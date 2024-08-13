from flask import Blueprint
import controllers.auth_controller as auth_controller

user_bp = Blueprint('user', __name__)

@user_bp.route("/register", methods=["POST"])
def handle_register():
    return auth_controller.register()

@user_bp.route("/login", methods=["POST"])
def handle_login():
    return auth_controller.login()

@user_bp.route("/logout", methods=["POST"])
def handle_logout():
    return auth_controller.logout()
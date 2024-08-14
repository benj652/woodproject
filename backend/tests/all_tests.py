import requests

BASE_URL = "http://localhost:8000"

def register_test():
    email = input('Enter email: ')
    username = input('Enter username: ')
    password = input('Enter password: ')
    confirm_password = input('Confirm password: ')
    response = requests.post(f'{BASE_URL}/auth/register',json={
        'email' : email,
        'username': username, 
        'password': password,
        'confirmPassword': confirm_password
        })
    print(response.status_code)
    print(response.text)
    print(response.cookies.get_dict())

def login_test():
    email = input('Enter email: ')
    password = input('Enter password: ')
    response = requests.post(f'{BASE_URL}/auth/login',json={
        'email': email, 
        'password': password,
        })
    print(response.status_code)
    print(response.text)
    print(response.cookies.get_dict())

def logout_test():
    response = requests.post(f'{BASE_URL}/auth/logout')
    print(response.status_code)
    print(response.text)
    print(response.cookies.get_dict())

def predict_test():
    response = requests.post(f'{BASE_URL}/prediction/predict', files={'file':open('213_10.jpg', 'rb')})
    print(response.status_code)
    print(response.text)

def main():
    response = "z"
    while response != "e":
        response = input(f'''
        Choose an action:\n
        a. registier test\n
        b. login test\n
        c. logout test\n
        d. predict test\n
        e. exit
        ''')
        if response == "a": register_test()
        elif response == "b": login_test()
        elif response == "c": logout_test()
        elif response == "d": predict_test()
        else: break

if __name__ == '__main__':
    main()
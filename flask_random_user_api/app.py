from flask import Flask, jsonify, request
import requests
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/user": {"origins": "http://localhost:3000"}})

@app.route('/user', methods=['GET'])
def get_random_user():
    print("User endpoint hit!") 

    gender = request.args.get('gender')

    url = 'https://randomuser.me/api/'
    if gender in ['male', 'female']:
        url += f'?gender={gender}'  # add gender to the API request

    response = requests.get(url)
    user_data = response.json() 

    # check if user retrieved
    if user_data['results']:
        return jsonify(user_data['results'][0]) 
    else:
        return jsonify({'error': 'No user found'}), 404 

if __name__ == '__main__':
    app.run(debug=True)
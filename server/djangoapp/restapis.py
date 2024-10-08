# Uncomment the imports below before you add the function code
# import requests
import os
from dotenv import load_dotenv
import requests

load_dotenv()

backend_url = os.getenv(
    'backend_url', default="http://localhost:3030")
sentiment_analyzer_url = os.getenv(
    'sentiment_analyzer_url',
    default="http://localhost:5050/")


def get_request(endpoint, **kwargs):
    params = ""
    if kwargs:
        # Build query parameters from kwargs
        params = "&".join(f"{key}={value}" for key, value in kwargs.items())

    # Construct the full request URL
    request_url = backend_url + endpoint
    if params:
        request_url += "?" + params

    print("GET from {}".format(request_url))  # Log the request URL

    try:
        # Call the GET method of the requests library
        response = requests.get(request_url)

        # Log the response status code and body for debugging
        print(f"Response Code: {response.status_code}")
        print(f"Response Body: {response.text}")  # Log the raw response body

        if response.status_code == 200:
            return response.json()  # Return parsed JSON if successful
        else:
            print(f"Error: Received status code {response.status_code}")
            return None  # Return None if there's an error
    except requests.exceptions.RequestException as e:
        print(f"Network exception occurred: {e}")  # Log any network errors
        return None  # Return None on exception


def analyze_review_sentiments(text):
    request_url = sentiment_analyzer_url+"analyze/"+text
    try:
        # Call get method of requests library with URL and parameters
        response = requests.get(request_url)
        return response.json()
    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")
        print("Network exception occurred")


def post_review(data_dict):
    request_url = backend_url+"/insert_review"
    try:
        response = requests.post(request_url, json=data_dict)
        print(response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        print("Network exception occurred")

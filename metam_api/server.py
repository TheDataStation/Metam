from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class TodoSimple(Resource):
    def get(self):
        # do get something

    def put(self):
        # do put something

    def delete(self):
        # do delete something

    def post(self):
        # do post something

api.add_resource(TodoSimple, '/api/todo')

if __name__ == '__main__':
    app.run(debug=True)
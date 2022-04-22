from flask import Flask, jsonify, request
from flask_restful import Resource, Api

from get_results import get_results
from get_tables import get_tables

app = Flask(__name__)
api = Api(app)

class Get_Tables(Resource):
    def get(self):
        return jsonify(get_tables())

class Get_Results(Resource):
    def get(self):
        return jsonify(get_results())

api.add_resource(Get_Tables, '/api/tables')
api.add_resource(Get_Results, '/api/results')

if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
import pandas as pd
import json

from get_results import get_results
from get_tables import get_tables

app = Flask(__name__)
api = Api(app)

class Get_Tables(Resource):
    def post(self):
        json_obj=json.loads(request.data)
        filename=json_obj['file']
        fileData=json_obj['filedata']
        #print (filename)

        return jsonify(get_tables(filename,fileData))

class Get_Results(Resource):
    def post(self):
        print ("get results",request.files,request)
        # Handle csv file
        df = pd.read_csv(request.files['file'])

        # Handle form data
        task = request.form['task']
        classification = request.form['classification']
        utilityMetric = request.form['utilityMetric']
        attribute = request.form['attribute']

        return jsonify(get_results(df, task, classification, attribute, utilityMetric))

api.add_resource(Get_Tables, '/api/tables')
api.add_resource(Get_Results, '/api/results')

if __name__ == '__main__':
    app.run(debug=True)
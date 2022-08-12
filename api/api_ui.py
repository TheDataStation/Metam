from flask import Flask, jsonify, request
from flask_restful import Resource, Api
import pandas as pd
import json

from get_results import get_results
from get_tables import get_tables


from ddapi import API
from api.apiutils import Relation
from modelstore.elasticstore import StoreHandler
from knowledgerepr.fieldnetwork import deserialize_network
import pandas as pd
from join_path import JoinKey, JoinPath
from DoD import data_processing_utils as dpu
from join_path_api import Join_Path_API, get_correlations
import sys
import os

app = Flask(__name__)
api = Api(app)

store_client = StoreHandler()
data_path = '/Users/sainyam/Documents/Metam_Code/nyc_cleaned/' # path to csv files
model_path = '/Users/sainyam/Documents/Metam/api/models/'  # path to the graph model
max_hop = 1  # max_hop of join paths

aurum_api = Join_Path_API(model_path)


class Get_Tables(Resource):
    def post(self):
        json_obj=json.loads(request.data)
        filename=json_obj['file']
        fileData=json_obj['filedata']
        #print (filename)

        return jsonify(get_tables(filename,fileData,aurum_api))

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
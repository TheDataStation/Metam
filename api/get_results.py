from random import uniform

# ARGUMENTS

# def get_results(dataset, tables, task, attribute, metric):
def get_results( dataset, task, classification, attribute, metric ):

    # dataset : pandas dataframe from the csv the user inputted

    # task - task to be performed by users 
    # values:
    # 1 - classificaiton
    # 2 - regression
    # 3 - What-if analysis
    # 4 - How-to analysis


    # classification - type of classification, if task is classification
    # values:
    # 1 - binary classification
    # 2 - multi-label classification
    # 3 - multi-class classification
    # 4 - imbalanced classification

    # attribute - the attribute in the user's dataset to be measured

    # metric - utility metric to be scored on# 
    # values:
    # 1 - mean squared error
    # 2 - mean absolute error
    # 3 - F-score

    res = [
        {
            "id": 1,
            "score": round(uniform(0,1), 2),
            "name": "UChicago CS Members", 
            "source": "UChicago CS",
            "preview": [
                {"name": "Javier", "location": "Chicago", "level": "Undergrad"},
                {"name": "Sainyam", "location": "Chicago", "level": "Postdoc"}
            ]
        },
        {
            "id": 2,
            "score": round(uniform(0,1), 2),
            "name": "Athletes",
            "source": "ESPN",
            "preview": [
                {"name": "Lionel Messi", "sport": "Soccer", "team": "Paris Saint-Germain"},
                {"name": "Cristiano Ronaldo", "sport": "Soccer", "team": "Mancester United"},
                {"name": "Lebron James", "sport": "Basketball", "team": "Los Angeles Lakers"}
            ]
        },
        {
            "id": 3,
            "score": round(uniform(0,1), 2),
            "name": "Animals", 
            "source": "Natgeo",
            "preview": [
                {"name": "Lion", "Class": "Mammalia", "genus": "Panthera"},
                {"name": "Crocodile", "class": "Reptilia", "location": "Crocodylus"}
            ]
        }
    ]

    return res;

# TABLE Object Properties
# id - unique id
# name - name of the table
# source - source of the dataset
# relationship - array of attributes in the user's dataset that are shared with the 
# score - utility metric computed by metam (optional)
# preview - array of dataset's row objects for head preview
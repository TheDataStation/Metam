# ARGUMENTS
# dataset - user's input dataset
# table_candidates - array of Tables selected by user to run Metam on
# task - task to be performed by users
# attribute - the attribute in the user's dataset to be measured
# metric - utility metric to be scored on

def get_results(dataset, tables, task, attribute, metric):
    return [
        {
            "id": 1,
            "name": "table1",
            "source": "UChicago CS",
            "relationship": ["name"],
            "preview": [
                {"name": "Javier", "location": "Chicago"}, 
                {"name": "Sainyam", "location": "Chicago"}
            ],
        }
    ]

# TABLE Object Properties
# id - unique id
# name - name of the table
# source - source of the dataset
# relationship - array of attributes in the user's dataset that are shared with the 
# score - utility metric computed by metam (optional)
# preview - array of dataset's row objects for head preview
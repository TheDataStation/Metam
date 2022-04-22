# ARGUMENTS
# dataset - user's input dataset

def get_tables(dataset):
    return [
        {
            "name": "table1",
            "score": 1,
            "relationship": ["name"],
            "source": "UChicago CS",
            "preview": [
                {"name": "Javier", "location": "Chicago"}, 
                {"name": "Sainyam", "location": "Chicago"}
            ],
        }
    ]
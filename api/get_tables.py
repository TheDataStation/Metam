# ARGUMENTS
# dataset - user's input dataset
import pandas as pd

# def get_tables(dataset):
def get_tables(filename,fileData,api):
    print (filename)
    print (fileData)
    result = []
    api.find_join_paths_from(filename, 1, result)
    print (len(result))
    return [
        {
            "id": 1,
            "name": "UChicago CS Members", 
            "source": "UChicago CS",
            "preview": [
                {"name": "Javier", "location": "Chicago", "level": "College"},
                {"name": "Sainyam", "location": "Chicago", "level": "Postdoc"}
            ]
        },
        {
            "id": 11,
            "name": "UChicago CS Members", 
            "source": "UChicago CS",
            "preview": [
                {"name": "Javier", "location": "Chicago", "level": "College"},
                {"name": "Sainyam", "location": "Chicago", "level": "Postdoc"}
            ]
        },
        {
            "id": 161,
            "name": "UChicago CS Members", 
            "source": "UChicago CS",
            "preview": [
                {"name": "Javier", "location": "Chicago", "level": "College"},
                {"name": "Javier", "location": "Chicago", "level": "College"},
                {"name": "Javier", "location": "Chicago", "level": "College"},
                {"name": "Javier", "location": "Chicago", "level": "College"},
                {"name": "Javier", "location": "Chicago", "level": "College"},
                {"name": "Javier", "location": "Chicago", "level": "College"},
                {"name": "Sainyam", "location": "Chicago", "level": "Postdoc"}
            ]
        },
        {
            "id": 151,
            "name": "UChicago CS Members", 
            "source": "UChicago CS",
            "preview": [
                {"name": "Javier", "location": "Chicago", "level": "College"},
                {"name": "Sainyam", "location": "Chicago", "level": "Postdoc"}
            ]
        },
        {
            "id": 141,
            "name": "UChicago CS Members", 
            "source": "UChicago CS",
            "preview": [
                {"name": "Javier", "location": "Chicago", "level": "College"},
                {"name": "Sainyam", "location": "Chicago", "level": "Postdoc"}
            ]
        },
        {
            "id": 131,
            "name": "UChicago CS Members", 
            "source": "UChicago CS",
            "preview": [
                {"name": "Javier", "location": "Chicago", "level": "College"},
                {"name": "Sainyam", "location": "Chicago", "level": "Postdoc"}
            ]
        },
        {
            "id": 121,
            "name": "UChicago CS Members", 
            "source": "UChicago CS",
            "preview": [
                {"name": "Javier", "location": "Chicago", "level": "College"},
                {"name": "Sainyam", "location": "Chicago", "level": "Postdoc"}
            ]
        },
        {
            "id": 111,
            "name": "UChicago CS Members", 
            "source": "UChicago CS",
            "preview": [
                {"name": "Javier", "location": "Chicago", "level": "College"},
                {"name": "Sainyam", "location": "Chicago", "level": "Postdoc"}
            ]
        },
        {
            "id": 2,
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
            "name": "Animals", 
            "source": "Natgeo",
            "preview": [
                {"name": "Lion", "Class": "Mammalia", "genus": "Panthera"},
                {"name": "Crocodile", "class": "Reptilia", "location": "Crocodylus"}
            ]
        }
    ]
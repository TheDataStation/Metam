# ARGUMENTS
# dataset - user's input dataset

# def get_tables(dataset):
def get_tables():
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
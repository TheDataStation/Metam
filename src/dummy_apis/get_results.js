const get_results = () => {

    const res = [
        {
            id: 1,
            score: Math.random().toFixed(2),
            name: "UChicago CS Members", 
            source: "UChicago CS",
            preview: [
                {"name": "Javier", "location": "Chicago", "level": "Undergrad"},
                {"name": "Sainyam", "location": "Chicago", "level": "Postdoc"}
            ]
        },
        {
            id: 2,
            score: Math.random().toFixed(2),
            name: "Athletes",
            source: "ESPN",
            preview: [
                {"name": "Lionel Messi", "sport": "Soccer", "team": "Paris Saint-Germain"},
                {"name": "Cristiano Ronaldo", "sport": "Soccer", "team": "Mancester United"},
                {"name": "Lebron James", "sport": "Basketball", "team": "Los Angeles Lakers"}
            ]
        },
        {
            id: 3,
            score: Math.random().toFixed(2),
            name: "Animals", 
            source: "Natgeo",
            preview: [
                {"name": "Lion", "Class": "Mammalia", "genus": "Panthera"},
                {"name": "Crocodile", "class": "Reptilia", "location": "Crocodylus"}
            ]
        }
    ]

    res.sort((a,b) => b.score - a.score);
    return res;
    
}

export default get_results
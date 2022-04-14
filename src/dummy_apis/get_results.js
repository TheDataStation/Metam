const get_results = () => {

    let res = []
    for (let i = 1; i < 50; i++) {
        res.push({
            name: "table" + String(i),
            score: Math.floor(Math.random()*10),
            recommended: Math.round(Math.random())
        })
    }  

    res.sort((a,b) => b.score - a.score )

    return res;
    
}

export default get_results
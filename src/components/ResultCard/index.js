const ResultCard = ({ name, score  }) => {

    return <div style={{
        width: "150px", 
        height: "150px", 
        border: "1px solid gray", 
        margin: "5px", 
        display: "flex",
        justifyContent: "center", 
        alignItems: "center",
        flexDirection: "column",
        fontSize: "20px",
        borderRadius: "5px"
        }}>
        
        <h4 style={{margin: "0"}}>{ name }</h4>
        <p style={{margin: "0"}}>score: {score}</p>

    </div>

}

export default ResultCard;
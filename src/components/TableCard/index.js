const TableCard = ({ name, source }) => {

    return <div style={{
        width: "100px", 
        height: "100px", 
        border: "1px solid gray", 
        margin: "5px", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        fontSize: "20px",
        borderRadius: "5px"
        }}>
        
        { name }

        {/* <p>{ source }</p> */}
    </div>

}

export default TableCard;
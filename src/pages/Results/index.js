import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import TableCard from '../../components/TableCard'
import FormDataCtxt from '../../utils/formData'
import {Apptest} from "../../pages/Appjs/Apptest";

const Results = () => {
    let navigate = useNavigate();
    const [formData, setFormData] = useContext(FormDataCtxt)
    const [results, setResults] = useState([])

    const validData = (data) => {
        return data.attribute && data.task && data.file
    }
    const Test = (color1,color2,color3,color4)=>{
        return Apptest(color1,color2,color3,color4);
    }
    useEffect(() => {
        if (formData) {
            const url = '/api/results'
            
            var data = new FormData();
            for (const itemName in formData) {
                console.log(itemName)
                data.append(itemName, formData[itemName])
            }
            fetch(url, {
                method: 'post',
                body: data
            })
            .then(res => res.json())
            .then(data => setResults(data))
        }
    }, [formData])

    if (validData(formData)) {
        return (
            <div className='container'>
                <h2>Metam Results</h2>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap"
                }}>

                    { results.map(r => <TableCard name={r.name} score={r.score} preview={r.preview} />) }
                    {Test('lightgreen','lightgreen','lightgreen','lightyellow')}
                </div>
            </div>
        )
    } else {
        navigate("/")
    }
    
}

export default Results;
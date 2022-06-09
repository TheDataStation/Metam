import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import TableCard from '../../components/TableCard'
import FormDataCtxt from '../../utils/formData'

const Results = () => {
    let navigate = useNavigate();
    const [formData, setFormData] = useContext(FormDataCtxt)
    const [results, setResults] = useState([])

    const validData = (data) => {
        return data.attribute && data.task && data.file
    }

    useEffect(() => {
        if (formData) {
            const url = '/api/results'
            fetch(url)
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
                </div>
            </div>
        )
    } else {
        navigate("/")
    }
    
}

export default Results;
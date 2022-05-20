import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import TableCard from '../../components/TableCard'

const Results = () => {

    const location = useLocation()
    const data = location.state
    const [results, setResults] = useState([])

    const validData = (data) => {
        return data.attribute && data.task && data.file
    }

    useEffect(() => {
        if (data) {
            const url = '/api/results'
            fetch(url)
            .then(res => res.json())
            .then(data => setResults(data))
        }
    }, [data])


    if (validData(data)) {
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
    }
    
}

export default Results;
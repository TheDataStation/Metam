import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ResultCard from '../../components/ResultCard'
import get_results from '../../dummy_apis/get_results'

const Results = () => {

    const location = useLocation()
    const data = location.state
    const [results, setResults] = useState([])

    const validData = (data) => {
        return data.attribute && data.task && data.file
    }

    useEffect(() => {
        if (data) {
            let res = get_results();
            setResults(res)
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

                    { results.map(r => <ResultCard name={r.name} score={r.score} />) }
                </div>
            </div>
        )
    }
    
}

export default Results;
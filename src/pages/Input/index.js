import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import get_tables from "../../dummy_apis/get_tables";
import TableCard from '../../components/TableCard'
import Papa from 'papaparse'

const Input = () => {

    let navigate = useNavigate();

    const [file, setFile] = useState(null)
    const [task, setTask] = useState(1)
    const [classification, setClassification] = useState(1)
    const [utilityMetric, setUtilityMetric] = useState(1)
    const [attribute, setAttribute] = useState(1)
    
    const [dataset, setDataset] = useState(null)

    const [matches, setMatches] = useState([])

    useEffect(() => {
        if (file) {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: r => setDataset(r)
            })
        }
    }, [file])


    const handleFile = e => {   
        setFile(e.target.files[0])
        fetchMatchData()
    }

    const handleSubmit = () => {
        navigate("/results", { state: { file, task, attribute }});
    }

    const fetchMatchData = () => {
        setMatches(get_tables());
    }

    return (
        <div className="container">
            <h1>Metam</h1>
            
            <label>Upload your csv dataset:</label>
            <input type="file" onChange={handleFile} accept=".csv" ></input>

            <span>
                {
                    file ? <Form2 
                        task={task} setTask={setTask} 
                        attribute={attribute} setAttribute={setAttribute}
                        file={file}
                        handleSubmit={handleSubmit}
                        matches={matches}
                        dataset={dataset}
                        classification={classification}
                        setClassification={setClassification}
                        utilityMetric={utilityMetric}
                        setUtilityMetric={setUtilityMetric}
                        /> : <></>
                }
            </span>


        </div>
    )
}

const Form2 = ({ task, setTask, attribute, setAttribute, file, handleSubmit, matches, dataset, classification, setClassification, utilityMetric, setUtilityMetric }) => {

    const handleTaskChange = e => {
        setTask(e.target.value)
        if (e.target.value !== 1) {
            setClassification(null)
        }
        else {
            setClassification(1);
        }
    }

    const handleAttributeChange = e => {
        setAttribute(e.target.value)
    }

    const handleClassificationChange = e => {
        setClassification(e.target.value)
    }

    const handleUtilityMetricChange = e => {
        setUtilityMetric(e.target.value)
    }

    return <>

        <label>Choose the Table Candidates to be considered by Metam:</label>
        <div style={{display: "flex", flexDirection: "row"}}>
            {
                matches.map(m => <TableCard 
                    name={m.name}
                    preview={m.preview} 
                />)
            }
        </div>

    <label>Choose the task to be performed on the data:</label>
    <select class="u-full-width" id="utility" value={task} onChange={handleTaskChange}>
        <option value="1">Classification</option>
        <option value="2">Regression</option>
        <option value="3">What-if analysis</option>
        <option value="4">How-to analysis</option>
        <option value="5" disabled={true}>Your own function</option>
    </select>

    {
        (task === 1) ? (
            <>
                <label>Classification kind:</label>
                <select class="u-full-width" id="utility" value={classification} onChange={handleClassificationChange}>
                    <option value="1">Binary Classification</option>
                    <option value="2">Multi-label Classification</option>
                    <option value="3">Multi-class Classification</option>
                    <option value="4">Imbalanced Classification</option>
                </select>
            </> 
        ) : null
    }


    <label>Choose the attribute to be measured:</label>
    <select class="u-full-width" id="attribute" value={attribute} onChange={handleAttributeChange}>
        {
            dataset ? dataset.meta.fields.map(f => <option value={f}>{f}</option> ) : null
        }
    </select>

    <label>Choose the task utility metric:</label>
    <select class="u-full-width" id="utility" value={utilityMetric} onChange={handleUtilityMetricChange}>
        <option value="1">Mean Squared Error</option>
        <option value="2">Mean Absolute Error</option>
        <option value="4">F-score</option>
        <option value="5" disabled={true}>Your own function</option>
    </select>

    <button type="submit" onClick={handleSubmit}>Run Metam</button>

    </>
}

export default Input
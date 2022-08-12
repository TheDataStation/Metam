import { useContext, useEffect, useState } from "react"
import { useNavigate, useLocation } from 'react-router-dom'
import TableCard from '../../components/TableCard'
import Papa from 'papaparse'
import FormDataCtxt from "../../utils/formData"

const Input = () => {

    let location = useLocation();
    let navigate = useNavigate();

    const [formData, setFormData] = useContext(FormDataCtxt);

    const handleFormChange = (field, value) => {
        setFormData(current => {
            return {
                ...current,
                [field]: value
            }
        })
    } 

    useEffect(() => {
        console.log(formData)
        console.log("file details")
        if (formData.file) {
            Papa.parse(formData.file, {
                header: true,
                skipEmptyLines: true,
                complete: r => fetchMatchData(r)//handleFormChange('dataset', r)
            })
            //fetchMatchData(formData.file)
            console.log(formData)

        }
    }, [formData.file])
    const fetchMatchData = (fileData) => {
        handleFormChange('dataset', fileData)
        console.log(formData.file.name)
        console.log(fileData)
        //console.log(JSON.stringify({'file':fData}))
        const url = '/api/tables'
        fetch(url, {
                method: 'post',
                body : JSON.stringify({'file':formData.file.name,'filedata':fileData})
            })
        .then(response => response.json())
        .then(data => handleFormChange('matches', data))
    }
    const handleFile = e => {  
        handleFormChange('file', e.target.files[0])
        
        console.log(formData.dataset)
    }

    const handleSubmit = () => {
        navigate("/results");
    }

    

    return (
        <div className="container">
            <h1>Metam</h1>

            
            <label>Upload your csv dataset:</label>
            {
                formData.file ? 
                    <p>Uploaded: {formData.file.name}</p> 
                    : 
                    <input type="file" onChange={handleFile}></input>
            }

            <span>
                {
                    formData.file && <Form2 
                        formData={formData}
                        handleFormChange={handleFormChange}
                        handleSubmit={handleSubmit}
                    />
                }
            </span>

        </div>
    )
}

const Form2 = ({ formData, 
    handleFormChange, 
    handleSubmit }) => {

    const { task, 
        attribute, 
        classification, 
        utilityMetric, 
        dataset, 
        matches } = formData

    

    const handleTaskChange = e => {
        handleFormChange('task', e.target.value);
        if (e.target.value !== 1) {
            handleFormChange('classification', null);
        }
        else {
            handleFormChange('classification', 1);
        }
    }

    const handleClassificationChange = e => {
        handleFormChange('classification', e.target.value);
    }

    const handleAttributeChange = e => {
        handleFormChange('attribute', e.target.value);
    }

    const handleUtilityMetricChange = e => {
        handleFormChange('utilityMetric', e.target.value);
    }

    return <>

        <label>Choose the Table Candidates to be considered by Metam:</label>
        <div className="container">
            {
                matches.map(m => <TableCard 
                    name={m.name}
                    id={m.id}
                    preview={m.preview} 
                />)
            }
        </div>
    
    <label>Choose the task to be performed on the data:</label>
    <select class="u-full-width" id="utility" key="{task}task" value={task} onChange={handleTaskChange}>
        <option value="1">Classification</option>
        <option value="2">Regression</option>
        <option value="3">What-if analysis</option>
        <option value="4">How-to analysis</option>
        <option value="5" disabled={true}>Your own function</option>
    </select>

    {
        (task === 1) && (
            <>
                <label>Classification kind:</label>
                <select class="u-full-width" id="utility" value="{classification}class" onChange={handleClassificationChange}>
                    <option value="1">Binary Classification</option>
                    <option value="2">Multi-label Classification</option>
                    <option value="3">Multi-class Classification</option>
                    <option value="4">Imbalanced Classification</option>
                </select>
            </> 
        )
    }

    <label>Choose the attribute to be measured:</label>
    <select class="u-full-width" id="attribute" key="{attribute}attr" value={attribute} onChange={handleAttributeChange}>
        {
            dataset && (
                dataset.meta.fields.map(f => <option value={f}>{f}</option>)
            )   
        }
    </select>

    <label>Choose the task utility metric:</label>
    <select class="u-full-width" id="utility" key="{utilityMetric}util" value={utilityMetric} onChange={handleUtilityMetricChange}>
        <option value="1">Mean Squared Error</option>
        <option value="2">Mean Absolute Error</option>
        <option value="4">F-score</option>
        <option value="5" disabled={true}>Your own function</option>
    </select>
        <br></br>
    <button type="submit" onClick={handleSubmit}>Run Metam</button>

    </>
}

export default Input
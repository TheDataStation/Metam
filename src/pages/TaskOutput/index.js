import { useContext, useEffect, useState } from "react"
import { useNavigate, useLocation } from 'react-router-dom'
import TableCard from '../../components/TableCard'
import MainTable from '../../components/MainTable'
import Papa from 'papaparse'
import FormDataCtxt from "../../utils/formData"
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import * as React from 'react';

import {Apptest} from "../../pages/Appjs/Apptest";

const TaskOutput = () => {

    let navigate = useNavigate();
    const [formData, setFormData] = useContext(FormDataCtxt)
    const [results, setResults] = useState([])

    const validData = (data) => {
        return data.attribute && data.task && data.file
    }
    
    const handleFormChange = (field, value) => {
        setFormData(current => {
            return {
                ...current,
                [field]: value
            }
        })
    } 
    const { task, 
        attribute, 
        classification, 
        utilityMetric, 
        dataset, 
        matches, folder,file } = formData

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
    const handleFolder = e => {  
        console.log(e.target.files,e.target.files[0].webkitRelativePath)
        handleFormChange('folder', e.target.files[0].webkitRelativePath)

        //iterate over the list and identify filenames
        //calculate folder name too
        handleFormChange('filelst', e.target.files)
        console.log(e.target.files[0].webkitRelativePath,formData.folder)
    }
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

    const handleSubmit = () => {
        navigate("/results");
    }
    const showTables = () => {
        navigate("/tables");
    }
    const taskSubmit = () => {
        navigate("/taskoutput");
    }
    const Test = (color1,color2,color3,color4)=>{
        return Apptest(color1,color2,color3,color4);
    }
    
    return (
        <div className="container">
            <h1>Metam</h1>
            
            <p><MainTable 
                    name={file.name}
                    preview={dataset.data}
                /></p>
            <p>Task: {formData.task}</p> 

            <label>Choose the folder you want to use:</label>
                {
                    formData.folder ? 
                        <p>Using folder: {formData.folder}</p> 
                        : 
                        <input type="file" webkitdirectory="" onChange={handleFolder}></input>
                }
             
             <br></br>

             <button type="submit" onClick={handleSubmit}>Run Metam</button>
                <div style={{clear:"both"}}></div>
                <div>{
                Test('lightgreen','lightgreen','lightyellow','grey')}
                </div>
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
        matches, folder,file } = formData

    
    const handleFolder = e => {  
        console.log(e.target.files,e.target.files[0].webkitRelativePath)
        handleFormChange('folder', e.target.files[0].webkitRelativePath)

        //iterate over the list and identify filenames
        //calculate folder name too
        handleFormChange('filelst', e.target.files)
        console.log(e.target.files[0].webkitRelativePath,formData.folder)
    }
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
        <div style={{backgroundColor:"#FFCCCB"}}>
        <div className="container" style={{backgroundColor:"white"}}>
            {
                  formData.dataset ? 
                  <p><MainTable 
                    name={file.name}
                    preview={dataset.data}
                /></p>:<p></p>
            }
        </div>
        </div>
        <div style={{backgroundColor:"white"}}>
        <label>Choose the folder you want to use:</label>
                {
                    formData.folder ? 
                        <p>Using folder: {formData.folder}</p> 
                        : 
                        <input type="file" webkitdirectory="" onChange={handleFolder}></input>
                }
        <br></br>
    <button type="submit" onClick={handleSubmit}>Run Metam</button>
    </div>
    </>
}

export default TaskOutput

//<label>Choose the Table Candidates to be considered by Metam:</label>
//       <div className="container">
//           {
//                matches.map(m => <TableCard 
//                    name={m.name}
//                    id={m.id}
//                    preview={m.preview} 
//                />)
 //           }
//        </div>
    
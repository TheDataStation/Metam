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
import Xarrow from "react-xarrows";

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
        handleFormChange('folder', e.target.files[0].webkitRelativePath.split("/")[0])

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
    const Test = (color1,color2,color3,color4,color5)=>{
        return Apptest(color1,color2,color3,color4,color5);
    }
    const clst=[]
    return (
        <div className="">
            <div style={{ float:"right",width:"100%", backgroundColor:"#C4DDFF", height:"70px"}}>
            <center><h4>GODDS</h4></center>
            </div>
             <div style={{ float:"left", height:"780px",width: "20%", backgroundColor:"#C4DDFF", margin: "0px 25px 0px 0px"}}>
                {
                Test('lightgreen','lightgreen','lightyellow','lightgrey','lightgrey')}
                </div>
            <div  style={{float:"left", width: "50%", backgroundColor:"white", margin: "20px 25px 0px 0px"}}>
            <MainTable 
                    id="elem1"
                    name={file.name}
                    preview={dataset.data}
                    wid="40%"
                    clst={clst}
                />
            <button style={{position: "absolute", left: "45%", margin:"133px 0px 0px 0px",backgroundColor:"#F9F5EB"}}type="submit" id="elem2" >{formData.task}</button>
            <button style={{position: "absolute", left: "60%", margin:"133px 0px 0px 0px",backgroundColor:"#F9F5EB"}}type="submit" id="score" >Utility score: 0.69</button>
            <Xarrow
                start="elem1" //can be react ref
                end="elem2"
                path="straight" //or an id
                color="black"
            />
            <Xarrow
                start="elem2" //can be react ref
                end="score"
                path="straight" //or an id
                color="black"
            />
            </div>
            
            <br></br>
            <br></br>
            
            
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            

            <div  style={{position: "absolute", left:"50%"}}>
            
            <br></br>
                {//{formData.folder} 
                    formData.folder ? 
                        <p>Using folder: {formData.folder} <br></br>Identified a total of 5966 datasets</p> 
                        : <p><label>Choose the external data you want to augment:</label>
                        <input style={{position: "absolute", left:"0%"}} type="file" webkitdirectory="" onChange={handleFolder}></input><br></br></p>
                }
                <button type="submit"  style={{boxShadow: "2px 2px 2px 1px #808080", border: "1px solid black", backgroundColor:"#e7e7e7",color:"black"}} onClick={handleSubmit}>Identify useful augmentations</button> &nbsp;  
                <button type="submit"  style={{boxShadow: "2px 2px 2px 1px #808080", border: "1px solid black", backgroundColor:"#e7e7e7",color:"black"}}  onClick={handleSubmit}>Change Augmentation Settings</button>
             
             
                <br></br>

                </div>
                <div style={{clear:"both"}}></div>
               
        </div>
    )
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
    
import { useContext, useEffect, useState } from "react"
import { useNavigate, useLocation } from 'react-router-dom'
import TableCard from '../../components/TableCard'
import MainTable from '../../components/MainTable'
import Papa from 'papaparse'
import FormDataCtxt from "../../utils/formData"
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import * as React from 'react';
import {Architecture} from "../../pages/Architecture/Architecture";

import {Apptest} from "../../pages/Appjs/Apptest";

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

        const prep_url = '/api/prepare'
        fetch(prep_url, {
                method: 'post',
                body : JSON.stringify({'file':formData.file.name,'filedata':fileData})
            })
        .then(response => response.json())
        .then(data => handleFormChange('cleaned', data))


        //console.log(JSON.stringify({'file':fData}))
        //const url = '/api/tables'
        //fetch(url, {
        //        method: 'post',
        //        body : JSON.stringify({'file':formData.file.name,'filedata':fileData})
        //    })
        //.then(response => response.json())
        //.then(data => handleFormChange('matches', data))
    }
    
    const handleFile = e => {  
        handleFormChange('file', e.target.files[0])
        
        console.log(formData.dataset)
    }
    
    const handleTaskChange = e => {

        //console.log("task",e.target.id)
        handleFormChange('task', e.target.id);
        e.target.style.backgroundColor="#C4DDFF"
        e.target.style.color="blue"
        if (e.target.id !== 1) {
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
        e.target.style.backgroundColor="#C4DDFF"
        handleFormChange('utilityMetric', e.target.id);
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
    const Refresh = () => {
        
        const prep_url = '/api/prepare'
        fetch(prep_url, {
                method: 'post',
                body : JSON.stringify({'file':formData.file.name,'filedata':formData.dataset})
            })
        .then(response => response.json())
        .then(data => handleFormChange('cleaned', data))


        //console.log(JSON.stringify({'file':fData}))
        //const url = '/api/tables'
        //fetch(url, {
        //        method: 'post',
        //        body : JSON.stringify({'file':formData.file.name,'filedata':fileData})
        //    })
        //.then(response => response.json())
        //.then(data => handleFormChange('matches', data))
    }
    return (
        
        <div style={{backgrountColor:"red", overflow:"hidden"}}>
            <div style={{ float:"right",width:"100%", backgroundColor:"#C4DDFF", height:"70px"}}>
                <center><h4>GODDS</h4></center>
             </div>
            <div style={{ float:"left", height:"780px",width: "20%", backgroundColor:"#C4DDFF", margin: "0px 0px 0px 0px"}}>
            {formData.file ?
                Test('lightgreen','lightyellow','lightgrey','lightgrey','lightgrey'): Test('lightyellow','lightgrey','lightgrey','lightgrey','lightgrey')}
             </div>
             
            <div style={{height:"700px", float:"left", width: "75%"}}>
            {
            formData.file? 
             <div style={{float:"left", width: "60%", backgroundColor:"white", margin: "50px 0px 10px 20px"}}>
                {
                    <div style={{float:"left", backgroundColor:"white", margin: "0px 0px 10px 20px"}}>Uploaded dataset: <a href=''>{formData.file.name}</a> <img className="photo" src={require('/Users/sainyam/Documents/GODDS/src/images/download.jpeg')}></img></div> 
                    
                }
                {<div style={{float:"right", width: "10%", backgroundColor:"white", margin: "0px 0px 10px 20px"}}><img className="photo" style={{left: 500, top: 100}} src={require('/Users/sainyam/Documents/GODDS/src/images/refresh.png')} onClick={Refresh} /></div>}
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
             : 
             
                <div style={{float:"left", width: "60%"}}>
                    <div style={{ height: "200px"}}> </div>
                     <div style={{ width: "100%", textAlign:"center"}}>
                     <label><h4>Upload your csv dataset:</h4></label>
                    <input type="file" onChange={handleFile}></input>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h5>Pre-loaded Example tasks and datasets</h5>
                    <button id="housing_classification" style={{boxShadow: "2px 2px 2px 1px #808080", border: "1px solid black", backgroundColor:"#e7e7e7",color:"black"}} type="submit" onClick={handleTaskChange}>Classification: Housing</button>  &nbsp;    
                    <button id="taxi_regression" style={{boxShadow: "2px 2px 2px 1px #808080", border: "1px solid black", backgroundColor:"#e7e7e7",color:"black"}} type="submit" onClick={handleTaskChange}>Regression: Taxi</button>  &nbsp;    
                    <button id="schools_what-if" style={{boxShadow: "2px 2px 2px 1px #808080", border: "1px solid black", backgroundColor:"#e7e7e7",color:"black"}} type="submit" onClick={handleTaskChange}>What-if: Schools</button>  &nbsp;    
                    <button id="schools_how-to" style={{boxShadow: "2px 2px 2px 1px #808080", border: "1px solid black", backgroundColor:"#e7e7e7",color:"black"}} type="submit" onClick={handleTaskChange}>How-to: Schools</button>  &nbsp;    
                    <br></br>
                    
                    </div>
                 
                </div>
            }
            
            <div style={{ float:"right", width: "37%",  margin: "50px 0px 0px 0px"}}>
               
                {
                formData.file ? <p>
                 <label>Choose the task to be performed on the data:</label>
    
                {
                   (task !== "classification") && (
                       <>
                    <button id="classification" style={{backgroundColor:"#F9F5EB",color:"black"}} type="submit" onClick={handleTaskChange}>Classification</button>  &nbsp;    
                    </>)
                }
                {
                   (task == "classification") && (
                       <>
                    <button id="classification" style={{backgroundColor:"#C4DDFF",color:"blue"}} type="submit" onClick={handleTaskChange}>Classification</button>  &nbsp;    
                    </>)
                }

                {
                   (task !== "regression") && (
                       <>
                    <button id="regression" style={{backgroundColor:"#F9F5EB",color:"black"}} type="submit" onClick={handleTaskChange}>Regression</button>  &nbsp;    
                    </>)
                }
                {
                   (task == "regression") && (
                       <>
                    <button id="regression" style={{backgroundColor:"#C4DDFF",color:"blue"}} type="submit" onClick={handleTaskChange}>Regression</button>  &nbsp;    
                    </>)
                }
                {
                   (task !== "what-if") && (
                       <>
                    <button id="what-if" style={{backgroundColor:"#F9F5EB",color:"black"}} type="submit" onClick={handleTaskChange}>what-if</button>  &nbsp;    
                    </>)
                }
                {
                   (task == "what-if") && (
                       <>
                    <button id="what-if" style={{backgroundColor:"#C4DDFF",color:"blue"}} type="submit" onClick={handleTaskChange}>what-if</button>  &nbsp;    
                    </>)
                }

{
                   (task !== "how-to") && (
                       <>
                    <button id="how-to" style={{backgroundColor:"#F9F5EB",color:"black"}} type="submit" onClick={handleTaskChange}>how-to</button>  &nbsp;    
                    </>)
                }
                {
                   (task == "how-to") && (
                       <>
                    <button id="how-to" style={{backgroundColor:"#C4DDFF",color:"blue"}} type="submit" onClick={handleTaskChange}>how-to</button>  &nbsp;    
                    </>)
                }


                {
                   (task !== "other") && (
                       <>
                    <button id="other" style={{backgroundColor:"#F9F5EB",color:"black"}} type="submit" onClick={handleTaskChange}>other</button>  &nbsp;    
                    </>)
                }
                {
                   (task == "other") && (
                       <>
                    <button id="other" style={{backgroundColor:"#C4DDFF",color:"blue"}} type="submit" onClick={handleTaskChange}>other</button>  &nbsp;    
                    </>)
                }

                 
                
                {
                //<select class="u-full-width" id="utility" style={{width:"45%"}} key="{task}task" value={task} onChange={handleTaskChange}>
                //<option value="Classification">Classification</option>
                //<option value="Regression">Regression</option>
                //<option value="What-if">What-if analysis</option>
                //<option value="How-to">How-to analysis</option>
                //<option value="5" disabled={true}>Your own function</option>
                //</select>
                //<button style={{height:"40px", backgroundColor:"blue", position: "absolute", left: "62%", margin:"5px 0px 0px 0px"}} type="submit" id="p1"  onClick={handleTaskChange} >Upload dataset </button>
                }


                {
                //   (task === 1) && (
                //        <>
                 //           <label>Classification kind:</label>
                 //           <select class="u-full-width"  style={{width:"45%"}} id="utility" value="{classification}class" onChange={handleClassificationChange}>
                 //               <option value="1">Binary Classification</option>
                 //               <option value="2">Multi-label Classification</option>
                 //               <option value="3">Multi-class Classification</option>
                 //               <option value="4">Imbalanced Classification</option>
                 //           </select>
                 //       </> 
                //  )
                
                 (task === "classification") && (
                <>
                <label>Choose the target attribute:</label>
                <select class="u-full-width" id="attribute" style={{width:"45%"}} key="{attribute}attr" value={attribute} onChange={handleAttributeChange}>
                    {
                        dataset && (
                            dataset.meta.fields.map(f => <option value={f}>{f}</option>)
                        )   
                    }
                </select>
                </>
                 )
                }
               {
                (task!="") &&(
                    <> <label>Choose the task utility metric (evaluation metric):</label></>
                )
               }

                {
                   (utilityMetric !== "accuracy") && (task=="classification")&& (
                       <>
                    <button id="accuracy" style={{backgroundColor:"#F9F5EB",color:"black"}} type="submit" onClick={handleUtilityMetricChange}>Accuracy</button>  &nbsp;    
                    </>)
                }
                {
                   (utilityMetric == "accuracy") && (task=="classification")&&(
                       <>
                    <button id="accuracy" style={{backgroundColor:"#C4DDFF",color:"blue"}} type="submit" onClick={handleUtilityMetricChange}>Accuracy</button>  &nbsp;    
                    </>)
                }
                {
                   (utilityMetric !== "recall") &&  (task=="classification")&&(
                       <>
                    <button id="recall" style={{backgroundColor:"#F9F5EB",color:"black"}} type="submit" onClick={handleUtilityMetricChange}>Recall</button>  &nbsp;    
                    </>)
                }
                {
                   (utilityMetric == "recall") &&  (task=="classification")&&(
                       <>
                    <button id="recall" style={{backgroundColor:"#C4DDFF",color:"blue"}} type="submit" onClick={handleUtilityMetricChange}>Recall</button>  &nbsp;    
                    </>)
                }
                
                {
                   (utilityMetric !== "f-score") &&  (task=="classification")&&(
                       <>
                    <button id="f-score" style={{backgroundColor:"#F9F5EB",color:"black"}} type="submit" onClick={handleUtilityMetricChange}>F-score</button>  &nbsp;    
                    </>)
                }
                {
                   (utilityMetric == "f-score") &&  (task=="classification")&&(
                       <>
                    <button id="f-score" style={{backgroundColor:"#C4DDFF",color:"blue"}} type="submit" onClick={handleUtilityMetricChange}>F-score</button>  &nbsp;    
                    </>)
                }

                {
                   (utilityMetric !== "mse") &&  (task=="regression")&& (
                       <>
                    <button id="mse" style={{backgroundColor:"#F9F5EB",color:"black"}} type="submit" onClick={handleUtilityMetricChange}>Mean-Squared Error</button>  &nbsp;    
                    </>)
                }
                {
                   (utilityMetric == "mse") &&  (task=="regression")&& (
                       <>
                    <button id="mse" style={{backgroundColor:"#C4DDFF",color:"blue"}} type="submit" onClick={handleUtilityMetricChange}>Mean-Squared Error</button>  &nbsp;    
                    </>)
                }
                {
                    <>
                    <br></br>
                    <button style={{boxShadow: "2px 2px 2px 1px #808080", border: "1px solid black", backgroundColor:"#e7e7e7",color:"black"}} type="submit">Customize Task </button>
                    </>
                }

                  
                <br></br>
                  <br></br>
                {formData.file ?
                <p>
                    <button style={{boxShadow: "2px 2px 2px 1px #808080", border: "1px solid black", backgroundColor:"#e7e7e7",color:"black"}} type="submit" onClick={taskSubmit}>Run Task</button>
                 </p>:<p></p>
                 }
                </p> : <p></p>
                }
                </div>
                </div>
                <div style={{clear:"both"}}></div>
                
                
            
                

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
    const Prepare = () => {
        window.open("http://localhost:8888/edit/api/prepare.py", "_blank");
    }
    
    const handleFolder = e => {  
        console.log(e.target.files,e.target.files[0].webkitRelativePath)
        handleFormChange('folder', e.target.files[0].webkitRelativePath)

        //iterate over the list and identify filenames
        //calculate folder name too
        handleFormChange('filelst', e.target.files)
        console.log(e.target.files[0].webkitRelativePath,formData.folder)
    }
    const clst=[]
    return <>
        <div className="" style={{backgroundColor:"white"}}>
            {
                  formData.dataset ? 
                  <p><MainTable 
                    name={file.name}
                    //preview={dataset.data}
                    preview={formData.cleaned}
                    wid="90%"
                    clst={clst}
                />  </p>:<p></p>
            }
        <button type="submit" style={{boxShadow: "2px 2px 2px 1px #808080", border: "1px solid black", backgroundColor:"#e7e7e7",color:"black"}} onClick={Prepare}>Prepare Dataset</button>  &nbsp; &nbsp;
        </div>
        
        
    </>
}

//<button type="submit" style={{backgroundColor:"#F9F5EB", color:"blue",color:"black"}} onClick={Refresh}>Refresh</button>
export default Input

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
    
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import TableCard from '../../components/TableCard'
import FormDataCtxt from '../../utils/formData'
import {Apptest} from "../../pages/Appjs/Apptest";
import MainTable from '../../components/MainTable'
import Xarrow from "react-xarrows";
import { saveAs } from 'file-saver';


const Results = () => {
    let navigate = useNavigate();
    const [formData, setFormData] = useContext(FormDataCtxt)
    const [results, setResults] = useState([])
    const [activeTab, setActiveTab] = useState("tab1");


    const validData = (data) => {
        return data.attribute && data.task && data.file
    }
    const Test = (color1,color2,color3,color4,color5)=>{
        return Apptest(color1,color2,color3,color4,color5);
    }
    const handleSubmit = () => {
        navigate("/inspect");
    }
    //currid is a random number given so that each button has a unique id even if we use same datasets multiple times
    const Draw_Triple = (loc,clst,dlst,currid)=>{
        var myButtons=[];
        

            var minloc=10000;
            var maxloc=0;
            var currloc=loc.toString();
            var button =  <button disabled = "disabled"  style={{border:"solid black", color:"black",backgroundColor:"#F9F5EB", position: "absolute", left: "25%", margin:currloc+"px 0pc 0px 0px"}} type="reset" id={currid+"header"} >Column</button>
            myButtons.push(button)
            var button =  <button disabled = "disabled" style={{border:"solid black",color:"black",backgroundColor:"#F9F5EB",position: "absolute", left: "35%", margin:currloc+"px 0pc 0px 0px"}}type="reset" id={currid+"dheader"} >Dataset</button>
            myButtons.push(button)
            loc+=60

            for (let i = 0; i < clst.length; i++) {
                    var currloc=loc.toString();
                    if (loc>maxloc){
                        maxloc=loc;
                    }
                    if (loc<minloc){
                        minloc=loc;
                    }

                     var button =  <button style={{border:"solid blue",backgroundColor:"#DFF6FF",color:"blue", position: "absolute", left: "25%", margin:currloc+"px 0pc 0px 0px"}}type="submit" id={currid+clst[i]} >{clst[i]}</button>
                     myButtons.push(button)
                     var button =  <button style={{border:"solid black",color:"black",position: "absolute", left: "35%", margin:currloc+"px 0pc 0px 0px"}}type="submit" id={currid+dlst[i]} >{dlst[i]}</button>
                     myButtons.push(button)

                    //var image= <img className="photo" style={{border:"solid black",color:"black",position: "absolute", left: "42%", margin:currloc+"px 0pc 0px 0px"}} src={require('/Users/sainyam/Documents/Metam/src/images/download.jpeg')}></img>
                    // myButtons.push(image)
                     loc+=100;


                     var line= <Xarrow
                    start={currid+clst[i]} //can be react ref
                    end={currid+dlst[i]}
                    path="straight" //or an id
                    color="black"
                    headShape={{
                        offsetForward: 1
                    }}
                    tailShape={{
                        
                        offsetForward: 1
                    }}
                    strokeWidth="1"
                />
                myButtons.push(line)

                     


                 }
        
             currloc=(maxloc+minloc)/2
             var task =  <button style={{position: "absolute", left: "55%", color:"black",margin:currloc+"px 0pc 0px 0px",backgroundColor:"#F9F5EB"}} type="submit" id={currid+"combine"} >Combine</button>
             myButtons.push(task)
             var task =  <button style={{position: "absolute", left: "70%", color:"black",margin:currloc+"px 0pc 0px 0px",backgroundColor:"#F9F5EB"}} type="submit" id={currid+"task"} >{formData.task}</button>
             myButtons.push(task)
             var score =  <button style={{position: "absolute", left: "85%", border:"solid green",color:"green",margin:currloc+"px 0pc 0px 0px",backgroundColor:"#DFF6FF"}} type="submit" id={currid+"score"} >Utility score: 0.84</button>
             myButtons.push(score)
             console.log(myButtons.length)
             for (let i = 0; i < dlst.length; i++) {
                if(i%2==1){
                            var arrow=<Xarrow
                        start={currid+dlst[i]} //can be react ref
                        end={currid+"combine"}
                        path="straight" //or an id
                        color="black"
                        headShape={{
                            offsetForward: 1
                        }}
                        tailShape={{
                            
                            offsetForward: 1
                        }}

                    />
                    myButtons.push(arrow)
                }
                else{
                    var arrow=<Xarrow
                    start={currid+dlst[i]} //can be react ref
                    end={currid+"combine"}
                    path="straight" //or an id
                    color="black"

                />
                myButtons.push(arrow)
                }
                


            

             }
             var arrow=<Xarrow
             start={currid+"combine"} //can be react ref
             end={currid+"task"}
             path="straight" //or an id
             color="black"
          />
          myButtons.push(arrow)
          var arrow=<Xarrow
             start={currid+"task"} //can be react ref
             end={currid+"score"}
             path="straight" //or an id
             color="black"
          />
          myButtons.push(arrow)
            return <>{myButtons}</>
        
        
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
    const clst=[]
    const clst2=["School Type","ES","ES/MS","MS","MS/HS","HS","ECC","HST"]

    function convertToCSV(array) {
        //var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        array=array['data']
        console.log(array)
        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','

                line += array[i][index];
            }
            console.log(i)
            str += line + '\r\n';
        }

        return str;
    }
    const Download = e => {
        var FileSaver = require('file-saver');
        console.log("downloading")

        var csv = convertToCSV(formData.dataset);
        console.log(csv)
        var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });


        //var blob=new Blob([JSON.stringify(formData.dataset)], {type : "application/json"})//new Blob([formData.dataset], {type: 'application/json'});
        FileSaver.saveAs(blob, "Augmented_dataset.csv");
    } 

    if (validData(formData)) {
        return (
            <div className="">
            <div style={{ float:"right",width:"100%", backgroundColor:"#C4DDFF", height:"70px"}}>
            <center><h4>GODDS</h4></center>
            </div>
             <div style={{ float:"left", height:"780px",width: "20%", backgroundColor:"#C4DDFF", margin: "0px 25px 0px 0px"}}>
                {
                Test('lightgreen','lightgreen','lightgreen','lightyellow','lightgrey')}
                </div>
                <br></br>
                <button style={{color:"black",position: "absolute", border:"0px", left: "25%", margin:"40px 0px 0px 0px"}}type="submit" id="without_augmentation" ><u>Without Augmentation</u></button>
                <button style={{color:"black",position: "absolute", border:"solid black", left: "35%", margin:"73px 0px 0px 0px"}}type="submit" id="base" >{formData.file.name}</button>
                <button style={{color:"black",position: "absolute", backgroundColor:"#F9F5EB",left: "55%", margin:"73px 0px 0px 0px"}}type="submit" id="task" >{formData.task}</button>
                <button style={{color:"black",position: "absolute", backgroundColor:"#F9F5EB", left: "75%", margin:"73px 0px 0px 0px"}}type="submit" id="orig_score" >Utility score: 0.69</button>
                <Xarrow
                        start="base" //can be react ref
                        end="task"
                        path="straight" //or an id
                        color="black"
                    />
                <Xarrow
                        start="task" //can be react ref
                        end="orig_score"
                        path="straight" //or an id
                        color="black"
                    />
                
                <button style={{color:"black",position: "absolute", border:"0px", left: "25%", margin:"153px 0px 0px 0px"}}type="submit" id="augmenting" ><u>Using Folder: {formData.folder}</u></button>

                {
                    Draw_Triple(183,['All','Trips','Crime','Store'],[formData.file.name,'6asd-gf.csv','4ux-6xy.csv','5yus-jh.csv'],"0")
                }
                <button style={{boxShadow: "2px 2px 2px 1px #808080", border: "1px solid black", backgroundColor:"#e7e7e7",color:"black",position: "absolute",left: "45%",margin:"600px 0pc 0px 0px"}} type="submit" id={"download"} onClick={Download} >Download Augmented Datasets</button>
                <button style={{boxShadow: "2px 2px 2px 1px #808080", border: "1px solid black", backgroundColor:"#e7e7e7",color:"black",position: "absolute", left: "69%",margin:"600px 0pc 0px 0px"}} type="submit" id={"download"} onClick={handleSubmit} >Inspect Execution</button>
                
            </div>
        ) 
    } else {
        navigate("/")
    }
    
}

export default Results;

//<img className="photo" style={{border:"solid black",color:"black",position: "absolute", left: "45%", margin:"610px 0pc 0px 0px"}} src={require('/Users/sainyam/Documents/Metam/src/images/download.jpeg')}></img>

//<div style={{
//                    display: "flex",
//                    flexDirection: "row",
//                    flexWrap: "wrap"
//                }}>
//
//                    { results.map(r => <TableCard name={r.name} score={r.score} preview={r.preview} />) }
//                    {Test('lightgreen','lightgreen','lightgreen','lightyellow')}
//                </div>




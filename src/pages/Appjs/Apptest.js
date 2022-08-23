import React from 'react';

import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

import './Apptest.css';  // contains .diagram-component CSS

// ...

/**
 * Diagram initialization method, which is passed to the ReactDiagram component.
 * This method is responsible for making the diagram and initializing the model and any templates.
 * The model's data should not be set here, as the ReactDiagram component handles that via the other props.
 */
function initDiagram() {
  const $ = go.GraphObject.make;
  // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
  const diagram =
    $(go.Diagram,
      {
        'undoManager.isEnabled': true,  // must be set to allow for model change listening
        // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
        'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
        model: new go.GraphLinksModel(
          {
            linkKeyProperty: 'key',  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
          })
      });
  
  // define a simple Node template
  var before =
    $(go.Node, 'Auto',  // the Shape will go around the TextBlock
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, 'RoundedRectangle',
        { name: 'SHAPE', fill: 'white', strokeWidth: 0 },
        // Shape.fill is bound to Node.data.color
        new go.Binding('fill', 'color')),
        $(go.Picture, 'type',
        { row: 1, width: 50, height: 50, scale: 1.0 }),
      $(go.TextBlock,
        { margin: 8, editable: true },  // some room around the text
        new go.Binding('text').makeTwoWay()
      )
    );

    var after =
    $(go.Node, 'Auto',  // the Shape will go around the TextBlock
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, 'Ellipse',
        { name: 'SHAPE', fill: 'white', strokeWidth: 0 },
        // Shape.fill is bound to Node.data.color
        new go.Binding('fill', 'color')),
      $(go.Picture, new go.Binding("source", "type"),
        { row: 1, width: 50, height: 50, scale: 1.0 }),
      $(go.TextBlock,
        { margin: 8, editable: true },  // some room around the text
        new go.Binding('text').makeTwoWay()
      )
    );

    var templmap = new go.Map(); // In TypeScript you could write: new go.Map<string, go.Node>();
    // for each of the node categories, specify which template to use
    templmap.add("before", before);
    templmap.add("after", after);
    diagram.nodeTemplateMap = templmap;

  
  //diagram.add(
      //$(go.Part,
      //  $(go.Picture,  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-cat-photos-1593441022.jpg?crop=0.669xw:1.00xh;0.166xw,0&resize=640:*")
      //));
     
      
  return diagram;
}

/**
 * This function handles any changes to the GoJS model.
 * It is here that you would make any updates to your React state, which is dicussed below.
 */
function handleModelChange(changes) {
  alert('GoJS model changed!');
}

// render function...
export function Apptest(color1,color2,color3,color4) {
  return (
    <div>
      <hr style={{background:"black", height:"2px"}}></hr>
      <b>Progress Bar:</b>
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName='diagram-component'
        nodeDataArray={[
          { key: 0, category:"before", text: 'Upload dataset', color: color1, loc: '-100 0' },
          //type:"https://thumbs.dreamstime.com/b/download-csv-file-group-people-document-isometric-vector-icon-251333552.jpg"
          //{ key: 0, category:"after",type:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-cat-photos-1593441022.jpg?crop=0.669xw:1.00xh;0.166xw,0&resize=640:*", text: 'Alpha', color: 'lightblue', loc: '0 0' },
          { key: 1, category:"before", text: 'Specify Task', color: color2, loc: '50 0' },
          { key: 2, category:"before", text: 'Specify external Data', color: color3, loc: '200 0' },
          { key: 3, category:"before", text: 'Inspect Results', color: color4, loc: '450 0' }
        ]}
        linkDataArray={[
          { from: 0, to: 1 },
          { key: 2, from: 1, to: 2 },
          { key: 3, from: 2, to: 3 },
        ]}
        //onModelChange={handleModelChange}
      />
    </div>
  );
}
//export default Apptest
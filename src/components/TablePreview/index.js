import { useState } from "react"
import "./index.css"

const TablePreview = ({ preview }) => {

    if (preview) {
        return <div className="tablepreview_container">

        <table className="u-max-full-width tablepreview_text">

        <thead> 
          <tr>
            {
              Object.keys(preview[0]).map(column_name => {
                return <th key={column_name}>{column_name}</th>
              })
            }
          </tr>
        </thead>

        <tbody>
        
          {
            preview.map(row => {
              return <tr>
                {
                  Object.keys(row).map(element => {
                    return <td key={row[element]}>
                      {row[element]}
                    </td>
                  })
                }
              </tr>
            })
          }

        </tbody>
      </table>
      </div>
    }
}

export default TablePreview;
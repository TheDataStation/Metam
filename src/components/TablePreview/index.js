import "./index.css"

const TablePreview = ({ preview }) => {
    // if (preview) {
        return <div className="tablepreview_container">

        <table className="u-max-full-width tablepreview_text">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Location</th>
            <th>University</th>
            <th>University</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dave Gamache</td>
            <td>26</td>
            <td>Male</td>
            <td>San Francisco</td>
            <td>University of Chicago</td>
            <td>University of Chicago</td>
          </tr>
          <tr>
            <td>Dwayne Johnson</td>
            <td>42</td>
            <td>Male</td>
            <td>Hayward</td>
            <td>University of Chicago</td>
            <td>University of Chicago</td>
          </tr>
        </tbody>
      </table>
      </div>
    }
// }

export default TablePreview;
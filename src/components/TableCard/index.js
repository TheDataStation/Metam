import TablePreview from "../TablePreview";
import "./index.css"

const TableCard = ({ id, name, source, relationship, score, preview }) => {
    return <div className="card_wrapper">

        <Header
            name={name}
            source={source}
            relationship={relationship}
            score={score}
        />

        <TablePreview preview={preview} />

    </div>

}

const Header = ({ name, source, relationship, score}) => <div className="card_header">

    <div className="card_header_row">
        <strong>
        { name }
        </strong>
        <span className="card_header_subtitle">
            { source }
        </span>
    </div>

    <div className="card_header_row">
        <span className="card_header_text">
            { 
                score ? 
                    <strong>Score: { score }</strong>
                    : null
            }

            {
                relationship ? 
                    relationship.map(r => r) : null
            }

        </span>
    </div>

    


</div>

export default TableCard;
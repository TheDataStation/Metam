import TablePreview from "../TablePreview";
import "./index.css";

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

const Header = ({ name, source, relationship, score}) => {

    return <div className="card_header">

        <div className="card_header_row">
            
            <span className="card_title">{ name }</span>
            
            <span className="card_header_subtitle">
                { source }
            </span>

        </div>

        <div className="card_header_row">
            <span className="card_header_text">

                { 
                    score && <strong>Score: { score }</strong>
                }

                {
                    relationship && relationship.map(r => r)
                }

            </span>
        </div>

    </div>
}

export default TableCard;
import AddIcon from '@mui/icons-material/Add';

export default function PageBar(props){
    return (
        <div className="text-white mt-4 w-100 d-flex flex-row-reverse bg-dark">
                <div className="wr-43">
                    <h2 className="float-start">{props.title}</h2>
                    <button className="float-end btn btn-dark mt-1" onClick={props.click}>Adicionar<AddIcon fontSize="small" style={{verticalAlign: "text-top"}}/></button>
                </div>
        </div>
    )
}
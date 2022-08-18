export default function PageBarTitleOnly(props){
    return (
        <div className="text-white mt-4 w-100 d-flex ta-center bg-dark">
                <div>
                    <h2 >{props.title}</h2>
                </div>
        </div>
    )
}
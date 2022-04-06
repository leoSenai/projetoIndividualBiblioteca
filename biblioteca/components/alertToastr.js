export default function AlertToastr(props){
    return (
        <Snackbar open={props.open} autoHideDuration={6000} onClose={props.close}>
            <Alert onClose={props.close} severity={props.type?"success":"error"} sx={{ width: '100%' }}>
                    {props.text}
            </Alert>
        </Snackbar>
    )
}
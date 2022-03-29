export default function handler(req, res){
    const {access_token} = req.body
    let retCriancas = [];
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ access_token
        }
    };
    fetch('http://localhost:3333/crianca',options)
        .then((response) => response.json())
            .then((criancas) => {
                res.status(200).json({
                    "dados": criancas
                });
            });
}
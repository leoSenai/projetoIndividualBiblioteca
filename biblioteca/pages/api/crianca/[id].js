export default function handler(req, res) {
    const { id } = req.query
    const {access_token} = req.body
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ access_token
        }
    };
    fetch('http://localhost:3333/crianca/id/'+id,options)
        .then((response) => response.json())
            .then((crianca) => {
                res.status(200).json({
                    "dados": crianca
                });
            });
  }
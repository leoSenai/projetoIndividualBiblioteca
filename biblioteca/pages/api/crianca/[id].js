export default function handler(req, res) {
    const { id } = req.query
    const { access_token, email_responsavel } = req.body

    if (req.method == 'POST') {

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            }
        };
        fetch('http://localhost:3333/crianca/id/' + id, options)
            .then((response) => response.json())
            .then((crianca) => {
                res.status(200).json({
                    "dados": crianca
                });
                res.end();
            });

    }else if(req.method == 'PATCH'){
        
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
            body: JSON.stringify({email_responsavel:email_responsavel})
        };
        fetch('http://localhost:3333/crianca/' + id, options).then((response)=>{
            if(response.status == 200){
                res.status(200).send()
                res.end();
            }else{
                res.status(400).send()
                res.end();
            }
        });
        

    }
}
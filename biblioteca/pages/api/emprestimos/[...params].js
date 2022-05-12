const renew = async (token, data) => {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    };
    return new Promise(async (resolve, reject) => {
        let response = await fetch('http://localhost:3333/emprestimo/renovar/1', options);
        return resolve(response);
    });
}

export default async function handler(req, res) {
    const { params } = req.query;
    const { access_token } = req.body;

    if(params[0] == 'renew'){
        const {data} = req.body;
        const renovar = await renew(access_token, data);
        if(renovar.status === 200) {
            res.status(200).send();
        }else{
            res.status(400).send();
        }
    }

}
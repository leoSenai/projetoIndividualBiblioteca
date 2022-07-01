const geratePdf = async (token, data) => {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    };
    return new Promise(async (resolve, reject) => {
        let response = await fetch(`http://localhost:3333/multa/quitar/${data}`, options);
        return resolve(response.json());
    });
}

export default async function handler(req, res) {
    const { params } = req.query;
    const { access_token } = req.body;

    if (req.method === 'PATCH') {
        const data = params[0];
        const renovar = await geratePdf(access_token, data);

        if(renovar.statusCode === 400) {
            res.status(400).send(renovar.message)
        }else{
            res.status(200).send();
        }
    }
}
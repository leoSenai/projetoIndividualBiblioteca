const geratePdf = async (token, data) => {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    };
    return new Promise(async (resolve, reject) => {
        //let response = await fetch('http://localhost:3333/emprestimo/renovar/1', options);
        return resolve(true);
    });
}

export default async function handler(req, res) {
    const { params } = req.query;
    const { access_token } = req.body;

    if (params[0] == 'pdf') {
        const data = 4//params[1];
        const renovar = await geratePdf(access_token, data);
        console.log(renovar)

        res.status(200).send();
    }
}
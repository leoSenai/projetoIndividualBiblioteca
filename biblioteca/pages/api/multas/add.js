const addData = (token, data) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    };
    return new Promise(async (resolve,reject) => {
        let response = await fetch('http://localhost:3333/multa/', options);
        return resolve(response);
    });
}

export default async function handler(req, res) {
    const {access_token, data} = req.body
    let livro = await addData(access_token, data);
    if(livro.status === 201){
        res.status(200).send();
        res.end();
    }else{
        res.status(400).send();
        res.end();
    }
}
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
        return resolve(response.json());
    });
}

const add = async (token, data) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    };
    return new Promise(async (resolve, reject) => {
        let response = await fetch('http://localhost:3333/emprestimo/', options);
        return resolve(response.json());
    });
}

const giveBack = (token, id) => {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    };
    return new Promise(async (resolve, reject) => {
        let response = await fetch(`http://localhost:3333/emprestimo/encerrar/${id}`, options);
        console.log(response);
        return resolve(response.json());
    });
}

export default async function handler(req, res) {
    const { params } = req.query;
    const { access_token } = req.body;

    if(params[0] == 'renew'){
        const {data} = req.body;
        const renovar = await renew(access_token, data);
        console.log(renovar)
        if(renovar.statusCode === 400) {
            res.status(400).send(renovar.message)
        }else{
            res.status(200).send();
        }
    }

    if(params[0] == 'add'){
        const {data} = req.body;
        const adicionar = await add(access_token, data);
        console.log(adicionar)
        if(adicionar.statusCode === 400) {
            res.status(400).send(adicionar.message)
        }else{
            res.status(200).send();
        }
    }

    if(params[0] == 'close'){
        const {data} = req.body;
        const fechar = await giveBack(access_token, data.idemprestimo);
        console.log(fechar)
        if(fechar.statusCode === 400) {
            res.status(400).send(fechar.message)
        }else{
            res.status(200).send();
        }
    }
}
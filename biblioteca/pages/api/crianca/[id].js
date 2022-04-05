const getData = (token, id) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    return new Promise(async (resolve,reject) => {
        let response =  await fetch('http://localhost:3333/crianca/id/' + id, options);
        let data = await response.json();
        return resolve(data);
    });
}

const updateData = (token, id, data) => {
    let pkt = {};

    if(data.senha !== "qwerty"){
        pkt.senha = data.senha
    }
    pkt.email_responsavel = data.email_responsavel;
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(pkt)
    };
    return new Promise(async (resolve,reject) => {
        let response = await fetch('http://localhost:3333/crianca/' + id, options);
        return resolve(response);
    });
}

export default async function handler(req, res) {
    const { id } = req.query
    const { access_token, data } = req.body

    if (req.method == 'POST') {
        const crianca = await getData(access_token,id);
        res.status(200).json({"dados": crianca});

    }else if(req.method == 'PATCH'){
        const response = await updateData(access_token,id,data)
            if(response.status == 200){
                res.status(200).send()
                res.end();
            }else{
                res.status(400).send()
                res.end();
            }
    }   
}
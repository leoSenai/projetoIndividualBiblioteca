const getData = async (token, id) => {
    let opt = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };

    let response = await fetch('http://localhost:3333/usuario/id/' + id, opt);
    let json = await response.json();
    return new Promise(function (resolve, reject) {
        return resolve(json);
    })
}
const updateData = async (token, id, data) => {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    };
    return new Promise(async (resolve, reject) => {
        let response = await fetch('http://localhost:3333/usuario/' + id, options);
        return resolve(response);
    });
}

export default async function handler(req, res) {
    const { id } = req.query;
    const { access_token } = req.body
    if (req.method == 'POST') {
        const usuario = await getData(access_token, id);
        res.status(200).json(usuario);
    } else if (req.method == 'PATCH') {
        const { data }  = req.body
        
        const reqChange =  await updateData(access_token, id, data);
        if(reqChange.status === 200) {
            res.status(200).send();
        }else{
            res.status(400).send();
        }
    }
}
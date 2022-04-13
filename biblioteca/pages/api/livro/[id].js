const getData = async (token, id) => {
    let opt = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };

    let response  = await fetch('http://localhost:3333/livro/'+id, opt);
    let json = await response.json();
    return new Promise(function(resolve, reject) {
        return resolve(json);
    })
}

export default async function handler(req, res) {
    const { id } = req.query;
    const { access_token} = req.body
    if(req.method == 'POST'){
        const livro = await getData(access_token, id);
        res.status(200).json(livro);
    }else if(req.method == 'PATCH'){
        console.log("implementando");
    }
}
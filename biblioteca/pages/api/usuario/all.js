const getData = (token) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    return new Promise(async (resolve, reject) => {
        let response = await fetch('http://localhost:3333/usuario', options)
        let data = await response.json();
        return resolve(data);
    });
}

export default async function handler(req, res) {
    const { access_token } = req.body
    const livros = await getData(access_token);
    res.status(200).json({
        "dados": livros
    });
}
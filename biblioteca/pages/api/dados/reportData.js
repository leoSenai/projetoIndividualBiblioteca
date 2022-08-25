const getData = (token, inicio, fim) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    return new Promise(async (resolve, reject) => {
        let response = await fetch(`http://localhost:3333/dados/report/${inicio}/${fim}`, options)
        let data = await response.json();
        return resolve(data);
    });
}

export default async function handler(req, res) {
    const { access_token, inicio, fim } = req.body
    const movimentacoes = await getData(access_token, inicio,fim);
    res.status(200).json({
        "dados": movimentacoes
    });
    res.end();
}
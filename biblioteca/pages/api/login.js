export default async function handler(req, res){

    const body = req.body;

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }

      const response = await fetch('http://localhost:3333/login', options);
      const result = await response.json();
      if(response.status != 200){
          return res.status(400).json({data: "errou"});
      }

      return res.status(200).json({data: result.access_token});
}
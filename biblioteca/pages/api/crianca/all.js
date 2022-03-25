import cookieCutter from 'cookie-cutter'
export default function handler(req, res){
    const access = cookieCutter.get('access_token');
    res.status(200).json({data:access});
}
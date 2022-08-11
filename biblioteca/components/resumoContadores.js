import Cookies from "universal-cookie";
import useSWR from 'swr'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts';

export default function Contadores(props) {
    const cookies = new Cookies()
    const access_token = cookies.get('access_token');
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "access_token": access_token
        }),
    }

    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(['/api/dados/all', options], fetcher, { refreshInterval: 500 })
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    console.log(data.dados);

    return <>
        <div className="ta-center">
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 4,
                        width: 128,
                        height: 128,
                    },

                }}
            >
                <Paper elevation={3} >
                    Crianças:
                    <div className="circulo">
                        {data.dados.contadores[0].length != 0 ? data.dados.contadores[0][0].total : 0}
                    </div>
                </Paper>
                <Paper elevation={3} >
                    Empréstimos:
                    <div className="circulo">
                        {data.dados.contadores[1].length != 0 ? data.dados.contadores[1][0].total : 0}
                    </div>
                </Paper>
                <Paper elevation={3} >
                    Multas:
                    <div className="circulo">
                        {data.dados.contadores[2].length != 0 ? data.dados.contadores[2][0].total : 0}
                    </div>
                </Paper>
            </Box>
        </div>
        <div className="ta-center mt-4">
            <BarChart width={1200} height={300} data={data.dados["porMes"]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
        </div>
    </>
}
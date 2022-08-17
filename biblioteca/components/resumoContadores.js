import Cookies from "universal-cookie";
import useSWR from 'swr'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

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
                <Paper elevation={3}>
                    <div className="resumeNumberTitle">
                        Crianças:
                    </div>
                    <div className="resumeNumber" style={{ "color": "blue" }} title= "Cadastradas">
                        {data.dados.contadores[0].length != 0 ? data.dados.contadores[0][0].total : 0}
                    </div>
                </Paper>
                <Paper elevation={3}>
                    <div className="resumeNumberTitle">
                        Empréstimos:
                    </div>
                    <div className="resumeNumber" style={{ "color": "#198c19" }}  title= "Ativos">
                        {data.dados.contadores[1].length != 0 ? data.dados.contadores[1][0].total : 0}
                    </div>
                </Paper>
                <Paper elevation={3}>
                    <div className="resumeNumberTitle">
                        Multas:
                    </div>
                    <div className="resumeNumber" style={{ "color": "#ff0000" }}  title= "Ativas">
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
                <Bar dataKey="emprestimos" fill="#198c19" />
                <Bar dataKey="multas" fill="#ff0000" />
            </BarChart>
        </div>
    </>
}
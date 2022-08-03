import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
export default function Contadores(props) {
    return <>
        <div className="ta-center   ">
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 2,
                        width: 128,
                        height: 128,
                    },

                }}
            >
                <Paper elevation={3} >
                    Crianças: numero
                </Paper>
                <Paper elevation={3} >
                    Empréstimos: numero
                </Paper>
                <Paper elevation={3} >
                    Multas: numero
                </Paper>
            </Box>
        </div>
    </>
}
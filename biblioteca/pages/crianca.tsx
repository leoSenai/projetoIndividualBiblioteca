import Menu from "../components/menu";
import Footer from "../components/footer";
import { useEffect, useState } from "react";

export default function Crianca() {

    const [data, setData] = useState(null);
    
    useEffect(() => {
        fetch('api/crianca/all')
            .then((res) => res.json())
                .then((data) =>{
                    setData(data)
                })
    }, [])

    return(
        <>
            <Menu/>
                {data}
            <Footer/>
        </>
    )
} 

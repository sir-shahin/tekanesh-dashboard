import { Box } from "@mui/material";
import { ReactNode } from "react";

export default function Card({children, title}: {children?:ReactNode, title: string} ){
    return <>
        <Box className="card" flex={1}>
            <div className="ch"><div className="ct"><span className="dot" style={{background:"var(--yellow)"}}></span>{title}</div></div>
            {children}
        </Box>
    </>
}
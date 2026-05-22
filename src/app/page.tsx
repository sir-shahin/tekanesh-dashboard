'use client'
import { Box, Button, Paper, TextField, Typography } from "@mui/material"
import Image from "next/image";
import Logo from '@/assets/logo.jpg'
import { useRouter } from "next/navigation";

export default function Login(){
    const router = useRouter()
    const handleSubmit = () =>{
        router.replace('/dashboard')
    }

    return <>
        <Box flex={1} minHeight={'100vh'} display='flex' justifyContent="center" alignItems={'center'}>
            <Box>
                <Box textAlign={'center'}>
                    <Image src={Logo.src} width={100} height={100} alt="بشری" style={{marginBottom:40, boxShadow: '0 5px 30px 10px #2873ac96'}}/>
                    <Typography variant="h4">پنل هلدینگ بشری</Typography>
                </Box>
            
                <Paper sx={{p:5, my:5, borderRadius:3}}>
                    <label>ایمیل</label>
                    <TextField
                        fullWidth 
                        size="small"
                        type="email"
                        margin="dense"
                        sx={{ mb:3}}
                        
                    />

                    <label>پسورد</label>
                    <TextField
                        fullWidth 
                        size="small"
                        type="password"
                        margin="dense"
                    />

                    <Button variant="contained" fullWidth sx={{mt:5}} onClick={handleSubmit}>ورود</Button>
                </Paper>
            </Box>
            
        </Box>
    </>
}
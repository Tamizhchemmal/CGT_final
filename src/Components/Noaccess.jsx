import React from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


function Noaccess() {
  return (
    <>
    <Stack sx={{ width: '100%', justifyContent:'center', alignItems:'center', height:'100vh'}} spacing={2}>
      
      <Alert severity="warning">This is a warning alert - You Have No access to this page!</Alert>
     
    </Stack>
    </>
  )
}

export default Noaccess

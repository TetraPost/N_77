import React, { useState, useEffect } from 'react';

/*UI*/

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';


import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Form from '../components/Form/index';
import ProTip from '../components/Form/protips';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


function App(){
  
  return(
    <html lang="en">
      <div className="">
        <header className="">
        <meta  name="viewport"  content="minimum-scale=1, initial-scale=1, width=device-width"/>
        </header>
    </div>
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Example (test001/test001@aol.com)
        </Typography>
        <Form />
        <ProTip />
        <Copyright />
      </Box>
    </Container>
    </html>
  );
}
export default App;


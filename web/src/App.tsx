import {
  Button,
  Container,
  Box,
} from '@mui/material';

import Navbar from './components/NavBar';
import Repository from './components/Repository/Repository';

function App() {
  return (
    <>
    <Box sx={{ width: '100%' }}>

      <Navbar/>

      <Repository/>
    </Box>

    </>
  )
}

export default App

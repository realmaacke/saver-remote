import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Saver
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Button color="inherit">Home</Button>
        <Button color="inherit">About</Button>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}
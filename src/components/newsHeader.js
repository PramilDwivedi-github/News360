import  React from 'react';

// import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { maxWidth } from '@mui/system';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

const DenseAppBar = ()=> {
  return (
    <Box className='news-header'
    sx={{
      width: maxWidth,
      height: 55,
      backgroundColor: 'primary.light',
      '&:hover': {
        backgroundColor: 'primary.main',
        opacity: [0.9, 0.8, 0.7],
      },
    }}
    >
    <div>menu</div>
    <div>logo</div>
    </Box>
  );
}

export default DenseAppBar;


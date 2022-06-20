import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { categories } from '../data/categories';

export default function SwipeableTemporaryDrawer({setCategory}) {
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const getData = (cat)=>{
    fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${cat}&apiKey=dd9341ad92794cd489bf1e383da78d09`)
    .then(resp=>resp.json())
    .then(data=>console.log(data))
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 180 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      Categories
      </List>
      <Divider />
      <List>
        {categories.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={()=>setCategory(text)}>
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {
        <React.Fragment key={"left"}>
          <Button onClick={toggleDrawer("left", true)}><MenuIcon></MenuIcon></Button>
          <SwipeableDrawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            {list("left")}
          </SwipeableDrawer>
        </React.Fragment>
      }
    </div>
  );
}

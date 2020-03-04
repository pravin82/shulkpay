import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
  list: {
    width: "100vw",
    height:300
  }
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false
  })

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}

    >
      <List>
        {['Add Class Due', 'Logout'].map((text, index) => (
          <ListItem button key={text}>
          <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

 
  return (
    <div>
      <IconButton onClick={toggleDrawer('top', true)} style = {{padding:0}}>
       <MenuIcon />
      </IconButton>
      <Drawer open={state.top} onClose={toggleDrawer('top', false)}>
        {sideList('top')}
      </Drawer>
    </div>
  );
}

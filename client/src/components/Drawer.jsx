import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
  list: {
    width: "50vw",
    height:300
  },
  drawerPaper: {
    height:100
  }

});

const styles = {
    button: {
        width: 32, height: 32,
        padding: 0
    }
};



export default function TemporaryDrawer(props) {
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
      onKeyDown={toggleDrawer(side, false)}

    >
    {props.studentDetail ? (
        <List>
      <ListItemText primary={"Add Due"}
                    style  = {{marginLeft:20, 
                              marginBottom:20,
                              color:"#FF4500"
                             }} 
                    onClick = {props.handleDueOpen}
     />
     <ListItemText primary={"PayFee"}
                    style  = {{marginLeft:20, 
                              marginBottom:20,
                              color: '#85bf31'

                             }} 
                    onClick = {props.handleLogOut}
     />
        
      </List>

    ):
    (
        <List>
      <ListItemText primary={"Add Class Due"}
                    style  = {{marginLeft:20, 
                              marginBottom:20
                             }} 
                    onClick = {props.handleDueOpen}
     />
     <ListItemText primary={"Logout"}
                    style  = {{marginLeft:20, 
                              marginBottom:20
                             }} 
                    onClick = {props.handleLogOut}
     />
        
      </List>

      )
  }
    
    </div>
  );

 
  return (
    <div>
      <IconButton onClick={toggleDrawer('top', true)} 
                  style = {styles.button}

      >
       <MenuIcon style = {{fontSize:32}} />
      </IconButton>
      <Drawer open={state.top} 
              onClose={toggleDrawer('top', false)}
              anchor = {props.studentDetail ? 'right': 'left' }
              style = {{marginTop:'15%'}}
              classes = {{paper: classes.drawerPaper}}
      >
              {sideList('top')}
      </Drawer>
    </div>
  );
}

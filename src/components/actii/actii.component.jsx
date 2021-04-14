import React from 'react';
import { NavLink as Link, Switch, Route, useParams, useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';

import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import InfoIcon from '@material-ui/icons/Info';


import CloseIcon from '@material-ui/icons/Close';

import Skeleton from '@material-ui/lab/Skeleton';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import itemsStore from '../../stores/items-store';

const queryString = require('query-string');

import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

function ActiiItem(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const item = props.item;

    return (
        <div>
            <img src={"https://newjacofood.ru/src/img/aktii/"+item.img_min} alt={item.promo_title} style={{ width: '100%' }} onClick={handleClickOpen} />
      
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" className="modalActii" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>{item.promo_title}</DialogTitle>
                <DialogContent dividers className="modalActiiContent">
                    <div dangerouslySetInnerHTML={{__html: item.text}} />
                </DialogContent>
                {item.promo.length > 0 ?
                    <DialogActions style={{ justifyContent: 'center' }}>
                        <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorderOther">
                            <Button variant="contained" className="BtnCardMain CardInCardItem">Применить промокод</Button>
                        </ButtonGroup>
                    </DialogActions>
                        :
                    null
                }
            </Dialog>
        </div>
    );
}

export class Actii extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {      
            actii: [],  
            is_load: false,
        };
    }
    
    componentDidMount = () => {
        if( document.querySelector('.activeCat') ){
            document.querySelector('.activeCat').classList.remove('activeCat');
        }
        window.scrollTo(0, 0);
        itemsStore.setPage('actii');
        
        fetch('https://jacofood.ru/src/php/test_app.php', {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'get_my_actii', 
                city_id: 1
            })
        }).then(res => res.json()).then(json => {
            console.log( json )
            
            this.setState({ 
                actii: json.actii, 
                is_load: true,
            });
        })
        .catch(err => { });
    }
    
    render() {
        if(!this.state.is_load){
            return (
                <Grid container spacing={3} className="MainItem">
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Skeleton variant="text" width={200} height={30} />
                    </Grid>
                    <Grid item xs={6}>
                        <Skeleton variant="rect" width={400} height={400} />
                    </Grid>
                    <Grid item xs={6}>
                        <Skeleton variant="text" width={500} height={60} />
                        <Skeleton variant="text" width={500} height={30} />
                        <Skeleton variant="text" width={500} height={30} />
                    </Grid>
                </Grid>
            )
        }
        
        return (
            <Grid container spacing={3} className="Actii">
                <Grid item xs={12}>
                    <Typography variant="h5" component="h1">Акции</Typography>
                </Grid>
                <Grid item container spacing={3} md={10} sm={12} xs={12} xl={10} className="mainContainer">
                    {this.state.actii.map((item, key) =>
                        <Grid item xs={12} sm={6} md={4} xl={3} key={key}>
                            <ActiiItem item={item} />
                        </Grid>
                    )}
                </Grid>
            </Grid>
        )
    }
}
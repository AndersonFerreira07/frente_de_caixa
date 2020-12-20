import React, { FC, useContext } from 'react';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CallMadeIcon from '@material-ui/icons/CallMade';
import DraftsIcon from '@material-ui/icons/Drafts';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import SendIcon from '@material-ui/icons/Send';
import SettingsIcon from '@material-ui/icons/Settings';

import { AppContext } from '../../App';

const useStyles = makeStyles((theme) => ({
  settings: {
    color: 'red',
  },
  icon: {
    color: theme.palette.secondary.main,
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    /* '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    }, */
  },
}))(MenuItem);

export type MenuMaisOpciesProps = {
  handleAction: (action: number) => void;
};

const MenuMaisOpcies: FC<MenuMaisOpciesProps> = ({ handleAction }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles();
  const {
    app: { saldoCaixa },
  } = useContext(AppContext);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function formatMoeda(valor: number) {
    return valor.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  const handleClickItem = (code: number) => {
    handleClose();
    handleAction(code);
  };

  return (
    <div>
      <div style={{ position: 'fixed', top: '10px', right: '20px' }}>
        <IconButton onClick={handleClick}>
          <MoreVertIcon className={classes.settings} />
        </IconButton>
      </div>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <StyledMenuItem onClick={(e) => handleClickItem(0)}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="Configurações" />
        </StyledMenuItem> */}
        <StyledMenuItem onClick={(e) => {}}>
          <ListItemIcon>
            <MonetizationOnIcon fontSize="small" className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary={`Saldo: ${formatMoeda(saldoCaixa)}`} />
        </StyledMenuItem>
        <StyledMenuItem onClick={(e) => handleClickItem(1)}>
          <ListItemIcon>
            <CallMadeIcon fontSize="small" className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="Chamar Gerente" />
        </StyledMenuItem>
        <StyledMenuItem onClick={(e) => handleClickItem(2)}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
};

export default MenuMaisOpcies;

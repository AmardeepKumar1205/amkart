import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import {
  MdMenu as MenuIcon,
  MdAccountCircle as AccountCircle,
  MdShoppingCart as ShoppingCart,
} from "react-icons/md";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  gutter: {
    flexGrow: 1,
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
}));

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Header = (props) => {
  const { history, auth } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorE2);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenu = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  const handleLoggedInMenuClick = (pageURL) => {
    history.push(pageURL);
    setAnchorE2(null);
  };

  let menuItems = [
    {
      menuTitle: "Shopping Cart",
      pageURL: "/shoppingCart",
    },
    {
      menuTitle: auth ? "Logout" : "Login",
      pageURL: auth ? "/Logout" : "/Login",
    },
  ];

  if (auth) {
    menuItems = [
      {
        menuTitle: "Shopping Cart",
        pageURL: "/shoppingCart",
      },
      {
        menuTitle: "Orders",
        pageURL: "/orders",
      },
      {
        menuTitle: "checkout",
        pageURL: "/checkout",
      },
      {
        menuTitle: auth ? "Logout" : "Login",
        pageURL: auth ? "/Logout" : "/Login",
      },
    ];
  }

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" onClick={() => handleButtonClick("/")}>
              AmKart
            </Typography>
            <div className={classes.gutter}></div>
            {isMobile ? (
              <>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuItems.map((menuItem) => {
                    const { menuTitle, pageURL } = menuItem;
                    return (
                      <MenuItem onClick={() => handleMenuClick(pageURL)}>
                        {menuTitle}
                      </MenuItem>
                    );
                  })}
                </Menu>
              </>
            ) : (
              <>
                <IconButton
                  color="inherit"
                  onClick={() => handleMenuClick("/shoppingCart")}
                >
                  <Badge badgeContent={0} color="secondary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
                {auth ? (
                  <>
                    <IconButton onClick={handleUserMenu} color="inherit">
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorE2={anchorE2}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={open2}
                      onClose={() => setAnchorE2(null)}
                    >
                      <MenuItem
                        onClick={() => handleLoggedInMenuClick("/orders")}
                      >
                        Orders
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleLoggedInMenuClick("/checkout")}
                      >
                        Checkout
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleLoggedInMenuClick("/logout")}
                      >
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button
                    color="inherit"
                    onClick={() => handleMenuClick("/login")}
                  >
                    Login
                  </Button>
                )}
              </>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin}></div>
    </>
  );
};

export default withRouter(Header);

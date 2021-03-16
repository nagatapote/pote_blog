import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { getIsSignedIn } from "redux/users/selectors";
import { makeStyles } from "@material-ui/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: 100,
  },
  menuBar: {
    backgroundColor: "#fff",
    color: "#444",
  },
  drawer: {
    width: 250,
  },
  iconButtons: {
    margin: "0 0 0 auto",
  },
}));

export const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const selectMenu = (path) => {
    dispatch(push(path));
    handleDrawerClose();
  };

  const handleDrawerToggle = useCallback(
    (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setOpen(!open);
    },
    [setOpen, open]
  );

  const filters = [
    { func: selectMenu, label: "すべて", id: "all", value: "/" },
    {
      func: selectMenu,
      label: "雑記",
      id: "miscellaneousNotes",
      value: "/?category=雑記",
    },
    {
      func: selectMenu,
      label: "お金",
      id: "money",
      value: "/?category=お金",
    },
    {
      func: selectMenu,
      label: "プログラミング",
      id: "programming",
      value: "/?category=プログラミング",
    },
    {
      func: selectMenu,
      label: "ミニマリスト",
      id: "minimalist",
      value: "/?category=ミニマリスト",
    },
  ];

  const menus = [
    { func: selectMenu, label: "Home", id: "home", value: "/" },
    {
      func: selectMenu,
      label: "About",
      id: "about",
      value: "/about",
    },
  ];

  const adminMenus = [
    {
      func: selectMenu,
      label: "管理画面",
      id: "admin",
      value: "/admin",
    },
    {
      func: selectMenu,
      label: "すべて",
      id: "all",
      value: "/admin/articleEditList",
    },
    {
      func: selectMenu,
      label: "雑記",
      id: "miscellaneousNotes",
      value: "/admin/articleEditList/?category=雑記",
    },
    {
      func: selectMenu,
      label: "お金",
      id: "money",
      value: "/admin/articleEditList/?category=お金",
    },
    {
      func: selectMenu,
      label: "プログラミング",
      id: "programming",
      value: "/admin/articleEditList/?category=プログラミング",
    },
    {
      func: selectMenu,
      label: "ミニマリスト",
      id: "minimalist",
      value: "/admin/articleEditList/?category=ミニマリスト",
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar>
          <h3 onClick={() => dispatch(push("/"))}>ぽてぶろぐ。</h3>
          <IconButton
            className={classes.iconButtons}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.drawer}>
        <Drawer
          classes={{
            paper: classes.drawer,
          }}
          open={open}
          anchor={"right"}
          onClose={handleDrawerToggle}
        >
          <List>
            <ListItemText>▼メニュー</ListItemText>
            <Divider />
            {menus.map((menu) => (
              <ListItem
                button
                key={menu.id}
                onClick={() => menu.func(menu.value)}
              >
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
          </List>
          <List>
            <ListItemText>▼カテゴリー</ListItemText>
            <Divider />
            {filters.map((filter) => (
              <ListItem
                button
                key={filter.id}
                onClick={() => filter.func(filter.value)}
              >
                <ListItemText primary={filter.label} />
              </ListItem>
            ))}
          </List>
          <List>
            {isSignedIn && <ListItemText>▼管理者専用メニュー</ListItemText>}
            <Divider />
            {adminMenus.map(
              (adminMenu) =>
                isSignedIn && (
                  <ListItem
                    button
                    key={adminMenu.id}
                    onClick={() => adminMenu.func(adminMenu.value)}
                  >
                    <ListItemText primary={adminMenu.label} />
                  </ListItem>
                )
            )}
          </List>
        </Drawer>
      </div>
    </div>
  );
};

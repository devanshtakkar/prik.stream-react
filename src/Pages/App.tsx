import { AppBar, Menu, MenuItem } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from "@mui/material/styles";
import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import React from "react";

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function App() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    let navigate = useNavigate();
    const navigation = useNavigation();
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleOpenNavMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                    >
                        <MenuItem>
                            <Typography
                                textAlign="center"
                                onClick={() => {
                                    navigate("/");
                                }}
                            >
                                Home
                            </Typography>
                        </MenuItem>
                        <MenuItem>
                            <Typography
                                textAlign="center"
                                onClick={() => {
                                    navigate("/users");
                                }}
                            >
                                Users
                            </Typography>
                        </MenuItem>
                    </Menu>
                    <Typography
                        variant="h6"
                        component="a"
                        href="/"
                        sx={{
                            flexGrow: 1,
                            textDecoration: "none",
                            color: "inherit",
                        }}
                        onClick={(event) => {
                            event.preventDefault();
                            navigate("/");
                        }}
                    >
                        Prik Stream
                    </Typography>
                </Toolbar>
            </AppBar>
            {navigation.state == "loading" ? (
                <h1>loading</h1>
            ) : (
                <Outlet></Outlet>
            )}
        </ThemeProvider>
    );
}

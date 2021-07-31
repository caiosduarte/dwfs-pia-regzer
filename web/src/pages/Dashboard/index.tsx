import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
} from "react-router-dom";

import Modal from "react-modal";

import {
    AppBar,
    Badge,
    Box,
    Container,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    Toolbar,
    Typography,
    makeStyles,
    Tooltip,
    Grid,
    Paper,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import clsx from "clsx";
import { FormEvent, useContext, useEffect, useState } from "react";
import { Copyright } from "../../components/Copyright";

import { Can } from "../../components/Can";
import { useCan } from "../../hooks/useCan";

import {
    PainelCheckouts,
    PainelRegistration,
    PainelDashboard,
    PainelUsers,
} from "./painels";

import { mainListItems, secondaryListItems } from "./listItem";
import { AuthContext } from "../../context/AuthContext";
import { UserModal } from "../../components/UserModal";
import Users from "./Users";
import { withAuth } from "../../utils/withAuth";
import { api } from "../../services/api";

// para acessibilidade
//Modal.setAppElement("#root");

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: "none",
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function Dashboard() {
    const { user, toPublic, signOut } = useContext(AuthContext);

    const validRoles = ["administrator"];

    const userIsAdmin = useCan({ roles: validRoles });

    const { path, url } = useRouteMatch();

    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    useEffect(() => {
        // withAuth({ user }, toPublic, api.get(`users/${user?.id}`), signOut);
    }, []);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, open && classes.appBarShift)}
            >
                <Toolbar className={classes.toolbar} color="primary">
                    <Can roles={validRoles}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(
                                classes.menuButton,
                                open && classes.menuButtonHidden
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Can>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}
                    >
                        Regzer
                    </Typography>

                    <Can roles={validRoles}>
                        <Tooltip
                            title="Notifications"
                            aria-label="notifications"
                            interactive
                        >
                            <IconButton
                                aria-label="notifications"
                                color="inherit"
                            >
                                <Badge badgeContent={4} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                    </Can>

                    <Tooltip
                        title={!!user && (user.name || "User")}
                        aria-label={"user " && user?.name}
                        interactive
                    >
                        <IconButton aria-label="user" color="inherit">
                            <Badge badgeContent={0} color="secondary">
                                <PersonIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Sign out" aria-label="sign out" interactive>
                        <IconButton
                            onClick={(event: FormEvent) => {
                                event.preventDefault();
                                signOut();
                            }}
                            color="inherit"
                        >
                            <ExitToAppIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <Can roles={validRoles}>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(
                            classes.drawerPaper,
                            !open && classes.drawerPaperClose
                        ),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>

                    <Divider />

                    <List>{mainListItems}</List>
                    <Divider />
                    <List>{secondaryListItems}</List>
                </Drawer>
            </Can>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Switch>
                        <Route exact path={path}>
                            <PainelDashboard
                                isAdmin={userIsAdmin}
                                classesContent={[
                                    fixedHeightPaper,
                                    fixedHeightPaper,
                                    classes.paper,
                                ]}
                            />
                        </Route>

                        <Route path={`${path}/users`}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <Users
                                            title="Users"
                                            pageSize={25}
                                            onEdit={() =>
                                                alert("from dashboard")
                                            }
                                        />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Route>

                        <Route path="/dashboard/checkouts">
                            <PainelCheckouts
                                isAdmin={userIsAdmin}
                                classesContent={[classes.paper]}
                            />
                        </Route>

                        <Route path="/dashboard/registration">
                            <PainelRegistration
                                isAdmin={userIsAdmin}
                                classesContent={[classes.paper]}
                            />
                        </Route>
                    </Switch>

                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );
}

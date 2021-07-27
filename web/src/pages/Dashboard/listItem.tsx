import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import LinkWrapper from "../../components/LinkWrapper";

export const mainListItems = (
    <div>
        <LinkWrapper to="/dashboard">
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
        </LinkWrapper>

        <LinkWrapper to="/dashboard/users">
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
            </ListItem>
        </LinkWrapper>

        {/* <LinkWrapper to="/dashboard/analysis">
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Analysis" />
            </ListItem>
        </LinkWrapper> */}

        <LinkWrapper to="/dashboard/checkouts">
            <ListItem button>
                <ListItemIcon>
                    {/* <LayersIcon /> */}
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Checkouts" />
            </ListItem>
        </LinkWrapper>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Saved reports</ListSubheader>
        <LinkWrapper to="/dashboard/registration">
            <ListItem button>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Current month" />
            </ListItem>
        </LinkWrapper>
    </div>
);

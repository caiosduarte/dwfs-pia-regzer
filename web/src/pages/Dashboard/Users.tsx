import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import LinkWrapper from "../../components/LinkWrapper";
import { Button } from "@material-ui/core";

// Generate Order Data
function createData(
    id: string,
    name: string,
    email: string,
    document: string,
    cellphone: string,
    isConfirmed: boolean,
    isValid: boolean
) {
    return { id, name, email, document, cellphone, isConfirmed, isValid };
}

const rows = [
    createData(
        "1212188d",
        "Elvis Presley",
        "elvis@presley.com",
        "3719",
        "3719",
        true,
        true
    ),
    createData(
        "2212188d",
        "Paul McCartney",
        "paul@mcCartney.com",
        "2574",
        "2574",
        false,
        false
    ),
    createData(
        "3212188d",
        "Tom Scholz",
        "tom@scholz.com",
        "1253",
        "1253",
        true,
        true
    ),
    createData(
        "4212188d",
        "Michael Jackson",
        "michael@jackson.com",
        "2000",
        "",
        true,
        true
    ),
    createData(
        "5212188d",
        "Bruce Springsteen",
        "bruce@springsteen.com",
        "",
        "",
        true,
        true
    ),
];

function preventDefault(event: any) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

export default function Orders() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Recent Users</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Document</TableCell>
                        <TableCell>Cellphone</TableCell>
                        <TableCell align="center">Confirmed?</TableCell>
                        <TableCell align="center">Validated?</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, key) => (
                        <TableRow key={row.id}>
                            <TableCell>
                                <LinkWrapper to={`/users/${row.id}`}>
                                    {row.name}
                                </LinkWrapper>
                            </TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.document}</TableCell>
                            <TableCell>{row.cellphone}</TableCell>
                            <TableCell align="center">
                                {row.isConfirmed ? (
                                    "Yes"
                                ) : (
                                    <Button
                                        onClick={(event) => {
                                            event?.preventDefault();
                                            alert(`Email send to ${row.email}`);
                                        }}
                                    >
                                        No! Send mail
                                    </Button>
                                )}
                            </TableCell>
                            <TableCell align="center">
                                {row.isValid ? "Yes" : "No"}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={classes.seeMore}>
                <Link color="primary" href="#" onClick={preventDefault}>
                    See more users
                </Link>
            </div>
        </React.Fragment>
    );
}

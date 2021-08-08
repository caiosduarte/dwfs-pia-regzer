import React, { FormEvent, useContext, useState } from "react";
import Link from "@material-ui/core/Link";
import {
    makeStyles,
    withStyles,
    Theme,
    createStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "../../components/Title";
import LinkWrapper from "../../components/LinkWrapper";

import { useEffect } from "react";
import { api } from "../../services/api";
import { UserModal } from "../../components/UserModal";
import { withAuth, withAuth2 } from "../../utils/withAuth";
import { AuthContext, User } from "../../context/AuthContext";

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            "&:nth-of-type(odd)": {
                backgroundColor: theme.palette.action.hover,
            },
        },
    })
)(TableRow);

interface IIDs {
    id: string;
    email?: string;
    document?: string;
    cellphone?: string;
}

interface IUser extends IIDs {
    name: string;

    type?: string;

    isAdmin?: boolean;
    isValid?: boolean;
    isConfirmed?: boolean;
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

type UsersProps = {
    title?: "Recent Users" | "Users";
    pageStart?: number;
    pageSize?: number;
    checkBoxSelection?: boolean;
    classSeeMore?: string;
    // onEdit?: (user: IUser) => void;
    onEdit?: () => void;
};

export default function Users({
    title = "Recent Users",
    pageStart = 0,
    pageSize = 5,
    classSeeMore,
    onEdit,
}: UsersProps) {
    const [rows, setRows] = useState<User[]>([]);

    const [userToUpdate, setUserToUpdate] = useState<User>();

    const [isUserModalOpen, setUserModalOpen] = useState(false);

    const { toPublic, user } = useContext(AuthContext);

    function handleCloseUserModal() {
        setUserModalOpen(false);
    }

    const classes = useStyles();

    useEffect(() => {}, []);

    useEffect(() => {
        api.get(`users?start=${pageStart}&offset=${pageSize}`)
            .then((response) => {
                const { data } = response;
                setRows(data);
            })
            .catch((err) => {
                console.error(err);
            });

        // try {
        //     withAuth(
        //         {},
        //         toPublic,
        //         api.get(`users?start=${pageStart}&offset=${pageSize}`),
        //         signOut
        //     )
        //         .then((response) => {
        //             const { data } = response;
        //             setRows(data);

        //             console.log(data);
        //         })
        //         .catch((err) => {
        //             throw err;
        //         });
        // } catch (err) {
        //     console.error(err);
        // }
    }, []);

    return (
        <React.Fragment>
            <Title>{title}</Title>
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
                        <TableRow key={row.id} color="default">
                            <TableCell>
                                {onEdit && !row.isAdmin ? (
                                    <Link
                                        href="#"
                                        onClick={(event: FormEvent) => {
                                            event.preventDefault();
                                            setUserModalOpen(true);
                                            setUserToUpdate(row);
                                        }}
                                    >
                                        {row.name}
                                    </Link>
                                ) : (
                                    row.name
                                )}
                            </TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.document}</TableCell>
                            <TableCell>{row.cellphone}</TableCell>
                            <TableCell
                                align="center"
                                color={
                                    row.confirmedAt ? "primary" : "secondary"
                                }
                            >
                                {row.confirmedAt ? "Yes" : "No"}
                            </TableCell>
                            <TableCell align="center">
                                {row.validatedAt ? "Yes" : "No"}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {title === "Recent Users" && (
                <div className={classSeeMore || classes.seeMore}>
                    <LinkWrapper to="/dashboard/users">
                        See more users
                    </LinkWrapper>
                </div>
            )}

            <UserModal
                isOpen={isUserModalOpen}
                onRequestClose={() => setUserModalOpen(false)}
                {...userToUpdate}
            />
        </React.Fragment>
    );
}

import React, { useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import LinkWrapper from "../../components/LinkWrapper";
import { Button, Tooltip } from "@material-ui/core";

import Icon from "@material-ui/core/Icon";
import { useEffect } from "react";
import { api } from "../../services/api";

interface IIds {
    id: string;
    email?: string;
    document?: string;
    cellphone?: string;
}

interface IUser extends IIds {
    name: string;

    isValid?: boolean;
    isConfirmed?: boolean;
    // expiresAt?: Date;
}

function preventDefault(event: any) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

type UsersProps = {
    title?: "Recent Checkouts" | "Checkouts";
    pageStart?: number;
    pageSize?: number;
    checkBoxSelection?: boolean;
    classSeeMore?: string;
};

export default function Checkouts({
    title = "Recent Checkouts",
    pageStart = 0,
    pageSize = 5,
    classSeeMore,
}: UsersProps) {
    const [rows, setRows] = useState<IUser[]>([]);

    const classes = useStyles();

    const usersMap = (array: IUser[]) =>
        array?.map(
            ({
                id,
                name,
                email,
                document,
                cellphone,
                isConfirmed,
                isValid,
            }: IUser) => {
                return {
                    id,
                    name,
                    email,
                    document,
                    cellphone,
                    isConfirmed,
                    isValid,
                };
            }
        );

    useEffect(() => {
        try {
            api.get(`users?start=${pageStart}&offset=${pageSize}`)
                .then((response) => {
                    console.log(response);
                    setRows(usersMap(response.data));

                    console.log(rows);
                })
                .catch((err) => {
                    throw err;
                });
        } catch (err) {
            console.error(err);
        }
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
                        <TableRow key={row.id}>
                            <TableCell>
                                <LinkWrapper to={`/users/${row.id}`}>
                                    {row.name}
                                </LinkWrapper>
                            </TableCell>
                            <TableCell>
                                {row.email}
                                {/* {row.isConfirmed ? (
                                    row.email
                                ) : (
                                    <Tooltip
                                        title="Send confirm email"
                                        aria-label="send confirm email"
                                        interactive
                                    >
                                        <Button
                                            onClick={(event) => {
                                                event?.preventDefault();
                                                alert(
                                                    `Confirm email send to ${row.email}`
                                                );
                                            }}
                                            variant="contained"
                                            color="default"
                                            size="small"
                                            endIcon={<Icon>send</Icon>}
                                        >
                                            {row.email}
                                        </Button>
                                    </Tooltip>
                                )} */}
                            </TableCell>
                            <TableCell>{row.document}</TableCell>
                            <TableCell>{row.cellphone}</TableCell>
                            <TableCell
                                align="center"
                                color={
                                    row.isConfirmed ? "primary" : "secondary"
                                }
                            >
                                {row.isConfirmed ? "Yes" : "No"}
                            </TableCell>
                            <TableCell align="center">
                                {row.isValid ? "Yes" : "No"}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {title === "Recent Checkouts" && (
                <div className={classSeeMore || classes.seeMore}>
                    <LinkWrapper to="/dashboard/checkouts">
                        See more users
                    </LinkWrapper>
                </div>
            )}
        </React.Fragment>
    );
}

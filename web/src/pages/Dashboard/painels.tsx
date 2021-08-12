import { Grid, Paper } from "@material-ui/core";
import React from "react";
import Chart from "./Chart";
import Deposits from "./Deposit";
import Users from "./Users";
import Registration from "./Registration";
import Checkouts from "./Checkouts";
import Registrations from "./Checkouts";

type PainelProps = {
    isAdmin: boolean;
    classesContent: string[];
    classesAdmin?: string[];
    classesUser?: string[];
    onRequestEditUser?: () => void;
};

type PainelPersonProps = PainelProps & { personId?: string };

export function PainelRegistration({
    isAdmin,
    personId,
    classesContent,
}: PainelPersonProps) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper className={classesContent[0]}>
                    <Registration personId={personId} />
                </Paper>
            </Grid>
        </Grid>
    );
}

export function PainelDashboard({
    isAdmin,
    personId,
    classesContent,
}: PainelPersonProps) {
    return isAdmin ? (
        <Grid container spacing={2}>
            {/* <Grid item xs={12} md={8} lg={9}>
                <Paper className={classesContent[0]}>
                    <Chart />
                </Paper>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
                <Paper className={classesContent[1]}>
                    <Deposits />
                </Paper>
            </Grid> */}

            <Grid item xs={12}>
                <Paper className={classesContent[2]}>
                    <Users />
                </Paper>
            </Grid>
        </Grid>
    ) : (
        <PainelRegistration
            isAdmin
            personId={personId}
            classesContent={[classesContent[2]]}
        />
    );
}

export function PainelUsers({
    isAdmin,
    classesContent,
    onRequestEditUser,
}: PainelProps) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper className={classesContent[0]}>
                    <Users
                        title="Users"
                        pageSize={25}
                        onEdit={onRequestEditUser}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
}

export function PainelCheckouts({ isAdmin, classesContent }: PainelProps) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper className={classesContent[0]}>
                    <Registrations title="Registrations" pageSize={25} />
                </Paper>
            </Grid>
        </Grid>
    );
}

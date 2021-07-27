import { Grid, Paper } from "@material-ui/core";
import React from "react";
import Chart from "./Chart";
import Deposits from "./Deposit";
import Users from "./Users";
import Registration from "./Registration";
import Checkouts from "./Checkouts";

type PainelProps = {
    isAdmin: boolean;
    classesContent: string[];
    classesAdmin?: string[];
    classesUser?: string[];
};

export function PainelRegistration({ isAdmin, classesContent }: PainelProps) {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Paper className={classesContent[0]}>
                    <Registration />
                </Paper>
            </Grid>
        </Grid>
    );
}

export function PainelDashboard({ isAdmin, classesContent }: PainelProps) {
    return isAdmin ? (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                <Paper className={classesContent[0]}>
                    <Chart />
                </Paper>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
                <Paper className={classesContent[1]}>
                    <Deposits />
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Paper className={classesContent[2]}>
                    <Users />
                </Paper>
            </Grid>
        </Grid>
    ) : (
        <PainelRegistration isAdmin classesContent={[classesContent[2]]} />
    );
}

export function PainelUsers({ isAdmin, classesContent }: PainelProps) {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Paper className={classesContent[0]}>
                    <Users title="Users" pageSize={25} />
                </Paper>
            </Grid>
        </Grid>
    );
}

export function PainelCheckouts({ isAdmin, classesContent }: PainelProps) {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Paper className={classesContent[0]}>
                    <Checkouts title="Checkouts" pageSize={25} />
                </Paper>
            </Grid>
        </Grid>
    );
}

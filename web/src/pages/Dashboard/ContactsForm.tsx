import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export default function ContactsForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Contacts & Social Media
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField
                        id="telephone"
                        name="telephone"
                        autoComplete="telephone"
                        label="Telephone"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="cellphone"
                        name="cellphone"
                        autoComplete="cellphone"
                        label="Cellphone"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="email"
                        name="email"
                        autoComplete="email"
                        label="Email Address"
                        fullWidth
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

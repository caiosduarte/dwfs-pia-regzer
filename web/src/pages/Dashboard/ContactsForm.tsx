import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export default function ContactsForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Contacts
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                    <TextField
                        required
                        id="telephone"
                        name="telephone"
                        autoComplete="telephone"
                        label="Telephone"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <TextField
                        required
                        id="cellphone"
                        name="cellphone"
                        autoComplete="cellphone"
                        label="Cellphone"
                        fullWidth
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

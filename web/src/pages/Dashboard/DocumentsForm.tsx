import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function DocumentsForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Documents & Certifications to send
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField
                        id="id"
                        autoComplete="rg"
                        label="Identity (RG)"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="cpf"
                        autoComplete="cpf"
                        label="CPF"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="passport"
                        autoComplete="passport"
                        label="Passport"
                        fullWidth
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

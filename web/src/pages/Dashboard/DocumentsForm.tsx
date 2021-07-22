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
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="id"
                        label="Identity"
                        fullWidth
                        autoComplete="rg"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cpf"
                        label="CPF"
                        fullWidth
                        autoComplete="cpf"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="id"
                        label="Identity"
                        fullWidth
                        autoComplete="rg"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cpf"
                        label="CPF"
                        fullWidth
                        autoComplete="cpf"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

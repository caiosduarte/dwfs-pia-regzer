import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {
    createStyles,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    InputLabel,
    makeStyles,
    NativeSelect,
    Radio,
    RadioGroup,
    Theme,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    })
);

export default function InfoForm() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Info
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="name"
                        name="name"
                        label="Full name"
                        fullWidth
                        autoComplete="name"
                    />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <TextField
                        required
                        id="birthday"
                        label="Birthday"
                        type="date"
                        // className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                            row
                            aria-label="gender"
                            name="gender1"
                            // value={value}
                            // onChange={handleChange}
                        >
                            <FormControlLabel
                                value="M"
                                control={<Radio />}
                                label="Male"
                            />
                            <FormControlLabel
                                value="F"
                                control={<Radio />}
                                label="Female"
                            />
                            <FormControlLabel
                                value="O"
                                control={<Radio />}
                                label="Other"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl
                        // className={classes.formControl}
                        error={false}
                    >
                        <InputLabel htmlFor="name-native-error">
                            Ethnicity
                        </InputLabel>
                        <NativeSelect
                            // value={state.name}
                            // onChange={handleChange}

                            name="ethnicity"
                            inputProps={{
                                id: "ethnicity",
                            }}
                        >
                            <option value=""></option>
                            <option value="olivier">Olivier</option>
                            <option value="kevin">Kevin</option>
                        </NativeSelect>
                        <FormHelperText>{}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="postal-code"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="country"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

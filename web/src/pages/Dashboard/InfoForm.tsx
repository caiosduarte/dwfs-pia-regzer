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
    MenuItem,
    NativeSelect,
    Radio,
    RadioGroup,
    Select,
    Theme,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
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
                <Grid item xs={6} sm={3}>
                    {/* <FormControl
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
                    </FormControl> */}

                    <FormControl
                    // className={classes.formControl}
                    >
                        <InputLabel htmlFor="ethnicity-label">
                            Ethnicity
                        </InputLabel>
                        <Select
                            // value={ethnicity}
                            // onChange={handleChange}
                            // className={classes.selectEmpty}
                            displayEmpty
                            autoWidth={false}
                            labelId="ethnicity-label"
                            id="ethnicity"
                            name="ethnicity"
                            inputProps={{ "aria-label": "ethnicity" }}
                        >
                            <MenuItem value={"AFRODESCENDENTE"}>
                                AFRODESCENDENTE
                            </MenuItem>
                            <MenuItem value={"BRANCO"}>BRANCO</MenuItem>
                            <MenuItem value={"ASIÁTICO"}>ASIÁTICO</MenuItem>
                            <MenuItem value={"AMERÍNDIO"}>AMERÍNDIO</MenuItem>
                            <MenuItem value={"MULATO"}>MULATO</MenuItem>
                            <MenuItem value={"MULTIRRACIAL/PARDO"}>
                                MULTIRRACIAL/PARDO
                            </MenuItem>
                            <MenuItem value={"NÃO DECLARADA"}>
                                NÃO DECLARADA
                            </MenuItem>
                        </Select>
                        <FormHelperText>{}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <TextField
                        id="mothersName"
                        name="mothersName"
                        label="Mother's Name"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <TextField
                        id="fathersName"
                        name="fathersName"
                        label="Father's Name"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl
                    // className={classes.formControl}
                    >
                        <InputLabel htmlFor="civilStatus-label">
                            Civil Status
                        </InputLabel>
                        <Select
                            // value={ethnicity}
                            // onChange={handleChange}
                            // className={classes.selectEmpty}
                            displayEmpty
                            labelWidth={13}
                            labelId="civilStatus-label"
                            id="civilStatus"
                            name="civilStatus"
                            inputProps={{ "aria-label": "civilStatus" }}
                        >
                            <MenuItem value={"SOLTEIRO"}>SOLTEIRO</MenuItem>
                            <MenuItem value={"UNIÃO ESTÁVEL"}>
                                UNIÃO ESTÁVEL
                            </MenuItem>
                            <MenuItem value={"CASADO"}>CASADO</MenuItem>
                            <MenuItem value={"SEPARADO"}>SEPARADO</MenuItem>
                            <MenuItem value={"DIVORCIADO"}>DIVORCIADO</MenuItem>
                            <MenuItem value={"VIÚVO"}>VIÚVO</MenuItem>
                        </Select>
                        <FormHelperText>{}</FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

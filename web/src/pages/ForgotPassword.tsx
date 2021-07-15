import {
    Avatar,
    Box,
    Container,
    CssBaseline,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    makeStyles,
    OutlinedInput,
    TextField,
    Typography,
} from "@material-ui/core";
import { Copyright } from "../components/Copyright";
import { SubmitButton } from "../components/SubmitButton";
import { EmailOutlined } from "@material-ui/icons";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { IdTextField } from "../components/IdTextField";
import { useState } from "react";
import { api } from "../services/api";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export function ForgotPassword() {
    const [submitError, setSubmitError] = useState<string>();
    const { formState, handleSubmit, register, reset, clearErrors } = useForm();

    const errorMessage = (field: FieldError) => field?.message;
    const isError = (field: FieldError) => !!field;
    const hasErrors = !!submitError;

    const classes = useStyles();

    const handleSend: SubmitHandler<{ ids: string }> = async (values) => {
        const { ids: email } = values;

        try {
            setSubmitError(undefined);
            await api.post("password/forgot", { email }, { headers: {} });

            await new Promise((resolve) => {
                setTimeout(resolve, 1500);
                reset();
                clearErrors();
            }).catch();
        } catch (error) {
            setSubmitError("Email não enviado");
            console.error(
                "/ForgorPassword.handleSend => status %d, %o",
                error.response?.status,
                error.response?.data
            );
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <EmailOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset your password
                </Typography>
                <form
                    onSubmit={handleSubmit(handleSend)}
                    className={classes.form}
                    noValidate
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <InputLabel htmlFor="email">
                                Enter your user account's verified email address
                                and we will send you a password reset link.
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth error={hasErrors}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    autoFocus
                                    required
                                    fullWidth
                                    label="Email Address"
                                    type="text"
                                    id="ids"
                                    autoComplete="email"
                                    error={isError(formState.errors.ids)}
                                    helperText={errorMessage(
                                        formState.errors.ids
                                    )}
                                    {...register("ids", {
                                        required:
                                            "O endereço de email é um campo obrigatório.",
                                        shouldUnregister: true,
                                    })}
                                />

                                <FormHelperText id="helper-text">
                                    {submitError ||
                                        "We'll never share your email."}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <SubmitButton
                        name="Send password reset email"
                        isFullWidth={true}
                        className={classes.submit}
                        isSubmitting={formState.isSubmitting}
                        isInvalid={hasErrors}
                    />
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

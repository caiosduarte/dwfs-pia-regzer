import {
    Avatar,
    Container,
    CssBaseline,
    Grid,
    makeStyles,
    TextField,
    Link,
    Typography,
    Box,
    FormControl,
    FormHelperText,
    CircularProgress,
    Button,
    Checkbox,
    FormControlLabel,
} from "@material-ui/core";
import { useState } from "react";

import { green } from "@material-ui/core/colors";

import clsx from "clsx";

import { SubmitHandler, useForm, FieldError } from "react-hook-form";
import { Copyright } from "./Copyright";
import { SubmitButton } from "./SubmitButton";

// import { LockOutlinedIcon } from "@material-ui/icons";

//     --primary-500: #3D4AFF;

// --secondary-500: #522CE8;

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
        marginTop: theme.spacing(1),
    },

    submit: {
        margin: theme.spacing(0, 0, 0.3),
    },

    buttonPanel: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2.5),
        border: 0,
        margin: 0,
        display: "inline-flex",
        padding: 0,
        position: "relative",
        minWidth: 0,
        flexDirection: "column",
        // verticalAlign: "top",
    },

    helpText: {
        margin: theme.spacing(0.375, 1.75, 0),
    },

    buttonSuccess: {
        backgroundColor: green[500],
        "&:hover": {
            backgroundColor: green[700],
        },
    },

    buttonProgress: {
        color: "#522CE8",
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12,
    },

    wrapper: {
        position: "relative",
    },
}));

interface IFormData {
    email: string;
    password: string;
}

interface SignInProps {
    isSignIn: boolean;
    isCheckIn?: boolean;
    onSubmit: (values: any) => Promise<void>;
    beforeSubmit?: (values: any) => Promise<void>;
    afterSubmit?: (values: any) => Promise<void>;
    handleSignUp?: () => void;
    handleForgotPassword?: () => void;
}

export default function SignIn({
    isSignIn,
    onSubmit,
    beforeSubmit,
    afterSubmit,
    handleSignUp,
    handleForgotPassword,
}: SignInProps) {
    const classes = useStyles();

    const {
        register,
        handleSubmit,
        formState: { errors },
        formState,
    } = useForm();

    const [submitError, setSubmitError] = useState<string>();

    const handleSignIn: SubmitHandler<IFormData> = async (values, event) => {
        try {
            setSubmitError(undefined);
            beforeSubmit && (await beforeSubmit(values));
            if (isSignIn) {
                const { email, password } = values;
                await onSubmit({ email, password });
            }
            afterSubmit && (await afterSubmit(values));
        } catch (error) {
            const errorResponse = error.response;
            if (errorResponse) {
                switch (errorResponse.status) {
                    case 401:
                        setSubmitError("Usuário e senha inválidos.");
                        break;
                    case 403:
                        setSubmitError("Parâmetros incorretos.");
                        break;
                    case 500:
                        setSubmitError("Erro na aplicação.");
                        break;
                }
            } else {
                setSubmitError("Erro ao enviar os dados.");
            }
            console.log(
                "SignIn => ",
                error.response.data?.message || error.message
            );
        }
    };
    const hasErrors = !!errors || !!submitError;

    const hasError = (field: FieldError): boolean => {
        return !!field || !!submitError;
    };

    const errorMessage = (field: FieldError) => {
        return field?.message;
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    {/* <LockOutlinedIcon /> */}
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                <form
                    onSubmit={handleSubmit(handleSignIn)}
                    className={classes.form}
                    noValidate
                >
                    <FormControl error={hasErrors} fullWidth>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            type="email"
                            label="Email Address"
                            autoComplete="email"
                            autoFocus
                            error={hasError(errors.email)}
                            helperText={errorMessage(errors.email)}
                            {...register("email", {
                                required:
                                    "O endereço de email é um campo obrigatório.",
                            })}
                        />

                        {isSignIn && (
                            <>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    error={hasError(errors.password)}
                                    helperText={errorMessage(errors.password)}
                                    {...register("password", {
                                        required:
                                            "Senha é um campo obrigatório.",
                                    })}
                                />
                            </>
                        )}
                        {/* 
                        <SubmitButton
                            name={isSignIn ? "Sign In" : "Next"}
                            isSubmitting={formState.isSubmitting}
                            isSubmitted={formState.isSubmitted}
                            isInvalid={!!errors}
                        /> */}
                        <div className={classes.buttonPanel}>
                            <div className={classes.wrapper}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    disabled={formState.isSubmitting}
                                    fullWidth
                                >
                                    {isSignIn ? "Sign In" : "Next"}
                                </Button>

                                {formState.isSubmitting && (
                                    <CircularProgress
                                        size={24}
                                        className={classes.buttonProgress}
                                    />
                                )}
                            </div>
                            <FormHelperText
                                className={classes.helpText}
                                id="helper-text"
                                error={hasErrors}
                            >
                                {submitError}
                            </FormHelperText>
                        </div>
                    </FormControl>

                    {isSignIn && (
                        <Grid container>
                            <Grid item xs>
                                <Link
                                    href="#"
                                    variant="body2"
                                    onClick={handleForgotPassword}
                                >
                                    Forgot password?
                                </Link>
                            </Grid>

                            <Grid item>
                                <Link
                                    href="#"
                                    variant="body2"
                                    onClick={handleSignUp}
                                >
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    )}
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

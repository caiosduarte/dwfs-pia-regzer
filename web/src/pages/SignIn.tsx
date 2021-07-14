import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    makeStyles,
    TextField,
    Typography,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { useState, useContext } from "react";
import { SubmitHandler, useForm, FieldError } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { Copyright } from "../components/Copyright";
import { IdTextField } from "../components/IdTextField";
import { SubmitButton } from "../components/SubmitButton";
import { AuthContext } from "../context/AuthContext";

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
        margin: theme.spacing(3, 0, 2),
    },
}));

interface IFormData {
    ids: string;
    password: string;
    remember?: any;
}

export default function SignIn() {
    const { signIn, checkIn, isNewUser } = useContext(AuthContext);
    const [submitError, setSubmitError] = useState<string>();
    const { formState, handleSubmit, register } = useForm();

    const isSignIn = !isNewUser;

    const hasErrors = !!submitError;
    const errorMessage = (field: FieldError) => field?.message;
    const isError = (field: FieldError) => !!field || hasErrors;

    const classes = useStyles();

    const handleSignIn: SubmitHandler<IFormData> = async (values) => {
        try {
            const { ids } = values;
            setSubmitError(undefined);
            if (isSignIn) {
                const { password, remember } = values;
                await signIn({ email: ids, password, remember });
            } else {
                await checkIn({ email: ids });
            }
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
                "sign-in => ",
                errorResponse.data?.message || error.message,
                " submit error",
                submitError
            );
            setSubmitError("Usuário e senha inválidos.");
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
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
                            autoFocus
                            required
                            fullWidth
                            label="Email Address"
                            type="text"
                            id="ids"
                            error={isError(formState.errors.ids)}
                            helperText={errorMessage(formState.errors.ids)}
                            {...register("ids", {
                                required:
                                    "O endereço de email é um campo obrigatório.",
                                shouldUnregister: true,
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
                                    error={isError(formState.errors.password)}
                                    helperText={errorMessage(
                                        formState.errors.password
                                    )}
                                    {...register("password", {
                                        required:
                                            "Senha é um campo obrigatório.",
                                        shouldUnregister: true,
                                    })}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="true"
                                            color="primary"
                                            {...register("remember", {
                                                shouldUnregister: true,
                                            })}
                                        />
                                    }
                                    label="Remember me"
                                />
                            </>
                        )}
                        {/* <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button> */}

                        <FormHelperText id="helper-text">
                            {submitError || "We'll never share your email."}
                        </FormHelperText>
                        <SubmitButton
                            name={isSignIn ? "Sign in" : "Next"}
                            isSubmitting={formState.isSubmitting}
                            isSubmitted={formState.isSubmitted}
                            isInvalid={!!formState.errors}
                            error={submitError}
                            className={classes.submit}
                        />
                    </FormControl>

                    <Grid container>
                        {isSignIn && (
                            <>
                                <Grid item xs>
                                    <NavLink to="/forgot-password">
                                        Forgot password?
                                    </NavLink>
                                    {/* <Link href="#" variant="body2">
                                Forgot password?
                            </Link> */}
                                </Grid>
                                <Grid item>
                                    <NavLink to="/sign-up">
                                        Don't have an account? Sign Up
                                    </NavLink>
                                    {/* <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link> */}
                                </Grid>
                            </>
                        )}
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

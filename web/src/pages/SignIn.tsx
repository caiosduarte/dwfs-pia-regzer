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
    FormLabel,
    Grid,
    Link,
    makeStyles,
    TextField,
    Typography,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { useState, useContext } from "react";
import {
    SubmitHandler,
    useForm,
    FieldError,
    Controller,
} from "react-hook-form";
import { NavLink } from "react-router-dom";
import { Copyright } from "../components/Copyright";
import LinkWrapper from "../components/LinkWrapper";
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
    const { formState, handleSubmit, register, control } = useForm();

    // TODO: Não precisa ser um isNewUser vindo do contexto?
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
            const status = error.response?.status;
            switch (status) {
                case 401:
                    setSubmitError("Usuário e senha inválidos.");
                    break;
                case 403:
                    setSubmitError("Parâmetros incorretos.");
                    break;
                case 404:
                    setSubmitError("Parâmetros incorretos.");
                    break;
                case 500:
                    setSubmitError("Erro na aplicação.");
                    break;
                default:
                    setSubmitError("Erro ao enviar os dados.");
            }

            console.error(
                "/SignIn.handleSignIn => status %d, %o",
                status,
                error.response?.data
            );
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
                                shouldUnregister: false,
                            })}
                        />
                        {/* {                            {
                                <IdTextField
                                    variant="outlined"
                                    margin="normal"
                                    label="Email Address"
                                    id="ids"
                                    type="text"
                                    isError={isError(formState.errors.ids)}
                                    errorMessage={errorMessage(
                                        formState.errors.ids
                                    )}
                                    {...register("ids", {
                                        required:
                                            "O endereço de email é um campo obrigatório.",
                                             shouldUnregister: true,
                                    })}
                                />
                            }} */}
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
                                    })}
                                />

                                <Controller
                                    name="remember"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    color="primary"
                                                    {...field}
                                                />
                                            }
                                            label="Remember me"
                                        />
                                    )}
                                />
                            </>
                        )}

                        <FormHelperText id="helper-text">
                            {submitError}
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
                                    <LinkWrapper
                                        to="/password-forgot"
                                        variant="body2"
                                    >
                                        Forgot password?
                                    </LinkWrapper>
                                </Grid>
                                <Grid item>
                                    <LinkWrapper to="/sign-up" variant="body2">
                                        Don't have an account? Sign Up
                                    </LinkWrapper>
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

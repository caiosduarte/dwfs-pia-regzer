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
import {
    SubmitHandler,
    useForm,
    FieldError,
    Controller,
} from "react-hook-form";

import { Copyright } from "../components/Copyright";
import LinkWrapper from "../components/LinkWrapper";
import { SubmitButton } from "../components/SubmitButton";
import { AuthContext } from "../context/AuthContext";
import { api } from "../services/api";
import { isUuid } from "../utils/uuid";

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
    remember?: string;
}

export default function SignIn(props: any) {
    const hash = props.match.params?.hash;
    const isConfirmation = isUuid(hash);
    const { signIn, checkIn, isNewUser } = useContext(AuthContext);
    const [submitError, setSubmitError] = useState<string>();
    const { formState, handleSubmit, register, control } = useForm<IFormData>();

    // TODO: Não precisa ser um isNewUser vindo do contexto?
    const isSignIn = !isNewUser;

    const hasErrors = !!submitError;
    const errorMessage = (field?: FieldError) => field?.message;
    const isError = (field?: FieldError) => !!field || hasErrors;

    const classes = useStyles();

    const handleSignIn: SubmitHandler<IFormData> = async (values) => {
        try {
            const { ids } = values;
            setSubmitError(undefined);
            if (isSignIn) {
                const { password, remember } = values;
                await signIn({ email: ids, password, remember });
            } else if (isConfirmation) {
                await api.patch(`users/confirm?token=${hash}`);
            } else {
                await checkIn({ email: ids });
            }
        } catch (error) {
            const status = error.response?.status;
            if (isConfirmation)
                switch (status) {
                    case 401:
                        setSubmitError("Confirmation expired.");
                        break;
                    case 403:
                        setSubmitError("User already confirmed.");
                        break;
                    case 500:
                        setSubmitError("App error. Try later.");
                        break;
                    default:
                        setSubmitError("Error to send data.");
                }
            else {
                switch (status) {
                    case 401:
                        setSubmitError("User/password invalid.");
                        break;
                    case 403:
                        setSubmitError("Parâmetros incorretos.");
                        break;
                    case 404:
                        setSubmitError("Parâmetros incorretos.");
                        break;
                    case 500:
                        setSubmitError("App error. Try later.");
                        break;
                    default:
                        setSubmitError("Error to send data.");
                }
            }

            console.error(
                "/SignIn.handleSignIn => status %d, %o",
                status,
                error.response?.data
            );
        }
    };

    const getSubmitErrorMessage = () => {
        return (
            !!submitError && (
                <>
                    {submitError}{" "}
                    {isConfirmation && (
                        <Button
                            onClick={(event: any) => {
                                event.preventDefault();
                            }}
                        >
                            Click to resend
                        </Button>
                    )}
                </>
            )
        );
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
                            // defaultValue={props.match.params?.emailCheckin}
                            error={isError(formState.errors.ids)}
                            helperText={errorMessage(formState.errors.ids)}
                            {...register("ids", {
                                required:
                                    "O endereço de email é um campo obrigatório.",
                                shouldUnregister: false,
                            })}
                        />
                        {isSignIn && !isConfirmation && (
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
                            {getSubmitErrorMessage()}
                        </FormHelperText>
                        <SubmitButton
                            name={
                                isSignIn
                                    ? "Sign in"
                                    : isConfirmation
                                    ? "Send confirmation"
                                    : "Next"
                            }
                            isSubmitting={formState.isSubmitting}
                            isSubmitted={formState.isSubmitted}
                            isInvalid={!!formState.errors}
                            error={submitError}
                            className={classes.submit}
                        />
                    </FormControl>

                    <Grid container>
                        {isSignIn && !isConfirmation && (
                            <>
                                <Grid item xs>
                                    <LinkWrapper
                                        to="/password-forgot"
                                        variant="body2"
                                        // {...{
                                        //     emailCheckIn: getValues("ids"),
                                        // }}
                                    >
                                        Forgot password?
                                    </LinkWrapper>
                                </Grid>
                                <Grid item>
                                    <LinkWrapper
                                        to="/sign-up"
                                        // variant="body2"
                                        // {...{
                                        //     emailCheckIn: getValues("ids"),
                                        // }}
                                    >
                                        {"Don't have an account? Sign Up"}
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

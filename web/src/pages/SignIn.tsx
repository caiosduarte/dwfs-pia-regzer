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
import { useEffect } from "react";
import { useState, useContext } from "react";
import {
    SubmitHandler,
    useForm,
    FieldError,
    Controller,
} from "react-hook-form";
import { useHistory, useParams, useLocation } from "react-router-dom";

import { Copyright } from "../components/Copyright";
import LinkWrapper from "../components/LinkWrapper";
import { SubmitButton } from "../components/SubmitButton";
import { AuthContext } from "../context/AuthContext";
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
    const _id = props.location.state?._id;

    const hash = props.match.params?.hash;
    const isConfirmation = isUuid(hash);

    const { signIn, checkIn, isNewUser, isConfirmed, isValidated } = useContext(AuthContext);

    const [submitError, setSubmitError] = useState<string>();

    const { formState, handleSubmit, register, control, getValues } =
        useForm<IFormData>();

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
            }
            // else if (isConfirmation) {
            //     await api.patch(`users/confirm?token=${hash}`);

            // }
            else {
                await checkIn({ email: ids });
            }
        } catch (error) {
            const status = error.response?.status;

            if(!status || status === 500) {
                setSubmitError("App error. Try later.");
            } else {
                setSubmitError(error.response.data.message);
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
                            defaultValue={_id}
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
                            label={
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
                                        id={getValues("ids")}
                                    >
                                        Forgot password?
                                    </LinkWrapper>
                                </Grid>
                                <Grid item>
                                    <LinkWrapper
                                        to="/sign-up"
                                        email={getValues("ids")}
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

import {
    Avatar,
    Box,
    Container,
    CssBaseline,
    FormControl,
    FormHelperText,
    Grid,
    makeStyles,
    TextField,
    Typography,
} from "@material-ui/core";
import { Copyright } from "../components/Copyright";
import { SubmitButton } from "../components/SubmitButton";
import { LockOutlined } from "@material-ui/icons";
import { useContext, useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import LinkWrapper from "../components/LinkWrapper";
import { useEffect } from "react";

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

export function SignUp(props: any) {
    const { signUp, isConfirmed } = useContext(AuthContext);
    const [submitError, setSubmitError] = useState<string>();
    const [confirmation, setConfirmation] = useState<string>();
    const [messageComponent, setMessageComponent] = useState<JSX.Element>();
    const { formState, register, handleSubmit, reset, clearErrors, getValues } =
        useForm<{
            name: string;
            email: string;
            password: string;
            confirmation: string;
        }>();

    const hasErrors = !!submitError;

    const errors = formState.errors;

    const errorMessage = (field: FieldError | undefined) => field?.message;

    const isError = (field: FieldError | string) =>
        (typeof field === "string"
            ? errors && Object.keys(errors).includes(field)
            : !!field) || hasErrors;

    const classes = useStyles();

    useEffect(() => {
        console.log("Props => ", props);
        // console.log("Props emailCheckIn => ", props.match.params?.emailCheckIn);
    }, []);

    const getConfirmation = () => {
        return (
            !!confirmation && (
                <>
                    {confirmation} {" " && messageComponent}
                </>
            )
        );
    };

    const getSubmitErrorMessage = () => {
        return (
            !!submitError && (
                <>
                    {submitError} {" " && messageComponent}
                </>
            )
        );
    };

    const handleSignUp = async (values: any) => {
        try {
            setSubmitError(undefined);
            setMessageComponent(undefined);

            await signUp(values);

            await new Promise((resolve) => {
                setTimeout(resolve, 1500);
                reset();
                clearErrors();
            })
                .catch()
                .finally(() => {
                    setConfirmation(
                        !isConfirmed
                            ? "Check your email for a link to confirm your registration. If it doesn’t appear within a few minutes, check your spam folder."
                            : "Your registration is confirmed."
                    );
                    setMessageComponent(
                        <LinkWrapper to="/sign-in">Sign in.</LinkWrapper>
                    );
                });
        } catch (error) {
            const status = error.response?.status;

            switch (status) {
                case 403:
                    setMessageComponent(
                        <LinkWrapper to="/sign-in">
                            Click to sign in.
                        </LinkWrapper>
                    );
                    setSubmitError("This email is already been used.");

                    break;
                case 500:
                    setSubmitError("App error. Try later.");
                    break;
                default:
                    setSubmitError(
                        error.response?.data.message || "Error to send data."
                    );
            }

            console.error(
                "/SignUp.handleSignUp => status %d, %o",
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
                    Sign up
                </Typography>
                <form
                    onSubmit={handleSubmit(handleSignUp)}
                    className={classes.form}
                    noValidate
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                autoComplete="off"
                                id="email"
                                label="Email Address"
                                autoFocus
                                // defaultValue={props.match.params?.emailCheckin}
                                error={isError("email")}
                                helperText={errorMessage(errors.email)}
                                {...register("email", {
                                    required:
                                        "O endereço de email é um campo obrigatório.",
                                })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Full Name"
                                autoComplete="nome"
                                error={isError("name")}
                                helperText={errorMessage(errors.name)}
                                {...register("name", {
                                    required:
                                        "O nome completo é um campo obrigatório.",
                                })}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={isError("password")}
                                helperText={errorMessage(errors.password)}
                                {...register("password", {
                                    required: "A senha é obrigatória.",
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Confirm passwd"
                                type="password"
                                id="confirmation"
                                error={isError("confirmation")}
                                helperText={errorMessage(errors.confirmation)}
                                {...register("confirmation", {
                                    required: "A confirmação é obrigatória.",
                                })}
                            />
                        </Grid>
                    </Grid>
                    <FormControl fullWidth>
                        <FormHelperText
                            id="helper-text"
                            margin="dense"
                            filled={true}
                            error={hasErrors}
                        >
                            {getSubmitErrorMessage() || getConfirmation()}
                        </FormHelperText>
                        <SubmitButton
                            label="Sign Up"
                            isFullWidth={true}
                            className={classes.submit}
                        />
                    </FormControl>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <LinkWrapper
                                // params={{
                                //     emailCheckIn: getValues("email"),
                                // }}
                                to="/sign-in"
                                variant="body2"
                            >
                                Already have an account? Sign in
                            </LinkWrapper>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

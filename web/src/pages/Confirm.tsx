import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    FormControl,
    FormHelperText,
    Link,
    makeStyles,
    TextField,
    Tooltip,
    Typography,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { ReactElement, useContext } from "react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, FieldError } from "react-hook-form";
import Icon from "@material-ui/core/Icon";

import { Copyright } from "../components/Copyright";

import { SubmitButton } from "../components/SubmitButton";
import { AuthContext } from "../context/AuthContext";
import { api } from "../services/api";
import { queryParams } from "../utils/queryParams";

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

interface IIDs {
    email: string;
    cellphone: string;
    document: string;
}

interface IFormData {
    ids: string;
}

export default function Confirm(props: any) {
    const { toAuthorized, isConfirmed } = useContext(AuthContext);

    const { formState, handleSubmit, register } = useForm<{ ids: string }>();

    const [submitError, setSubmitError] = useState<string>();

    const [confirmMessage, setConfirmMessage] = useState<string>();

    const [messageComponent, setMessageComponent] = useState<JSX.Element>();

    const params = queryParams(props.location.search) as IIDs;

    const hash: string = props.match.params?.hash;

    const isConfirmation = !isConfirmed && isUuid(hash);

    const hasErrors = !!submitError;
    const errorMessage = (field: FieldError | undefined) => field?.message!;
    const isError = (field: FieldError | undefined) => !!field || hasErrors;

    const classes = useStyles();

    useEffect(() => {
        if (!isConfirmation) {
            toAuthorized();
        }
    }, []);

    const getSubmitErrorMessage = () => {
        return (
            submitError && (
                <>
                    {submitError} {" " && messageComponent}
                </>
            )
        );
    };

    const getConfirmMessage = () => {
        return (
            confirmMessage && (
                <>
                    {confirmMessage} {" " && messageComponent}
                </>
            )
        );
    };

    const handleErrors = async (status: number, originalMessage?: string) => {
        switch (status) {
            case 401:
                setSubmitError("Confirmation expired.");
                setMessageComponent(tokenExpired);
                break;
            case 403:
                setSubmitError("User already confirmed.");
                toAuthorized();
                break;
            case 500:
                setSubmitError("App error. Try later.");
                break;
            default:
                setSubmitError(originalMessage || "Error to send data.");
        }
    };

    const handleSend: SubmitHandler<IFormData> = async (values) => {
        try {
            setSubmitError(undefined);
            setMessageComponent(undefined);

            const { ids: email } = values;

            await api.patch(`users/confirm?token=${hash}`, { email });

            setConfirmMessage("Registration confirmed.");
        } catch (error) {
            const status = error.response?.status;

            handleErrors(status);

            console.error(
                "/Confirm.handleConfirm => status %d, %o",
                status,
                error.response?.data
            );
        }
    };

    const handleResend: SubmitHandler<IFormData> = async (values) => {
        try {
            setSubmitError(undefined);
            setMessageComponent(undefined);

            const { ids: email } = values;

            await api.post(`users/confirm`, { email });

            setConfirmMessage(
                "Check your email for a link to confirm your registration. If it doesn’t appear within a few minutes, check your spam folder."
            );
        } catch (error) {
            const status = error.response?.status;

            handleErrors(status, error.response?.data.message);

            console.error(
                "/Confirm.handleConfirm => status %d, %o",
                status,
                error.response?.data
            );
        }
    };

    const tokenExpired = (
        <>
            {submitError}{" "}
            <Tooltip
                title="Click to resend confirm email"
                aria-label="resend confirm email"
                interactive
            >
                <Button
                    variant="contained"
                    color="default"
                    size="small"
                    endIcon={<Icon>send</Icon>}
                    onClick={handleSubmit(handleResend)}
                >
                    Resend
                </Button>
            </Tooltip>
        </>
    );

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Confirm your registration
                </Typography>

                <form
                    onSubmit={handleSubmit(handleSend)}
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
                            defaultValue={params.email}
                            error={isError(formState.errors.ids)}
                            helperText={errorMessage(formState.errors.ids)}
                            {...register("ids", {
                                required:
                                    "O endereço de email é um campo obrigatório.",
                            })}
                        />

                        <FormHelperText id="helper-text">
                            {getSubmitErrorMessage() ||
                                getConfirmMessage() ||
                                "Confirm your registration by email."}
                        </FormHelperText>
                        <SubmitButton
                            name={"Confirm"}
                            isSubmitting={formState.isSubmitting}
                            isSubmitted={formState.isSubmitted}
                            isInvalid={!!formState.errors}
                            error={submitError}
                            className={classes.submit}
                        />
                    </FormControl>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

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
import { VerifiedUserOutlined } from "@material-ui/icons";
import { FieldError, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { api } from "../services/api";
import { useEffect } from "react";
import { isUuid } from "../utils/uuid";
import LinkWrapper from "../components/LinkWrapper";
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

type PasswordResetProps = {
    hash: string;
};

// import React from "react";
// import { Link } from "react-router-dom";

// export const MovieItem = (props) => {
//     return (
//         <li>
//             <Link to={`/movies/${props.id}`} params={{ id: props.id }}>
//                 {props.title}
//             </Link>{" "}
//             | Popularity: {props.popularity}
//         </li>
//     );
// };

export function PasswordReset(props: any) {
    const hash = props.match.params?.hash;

    const [submitError, setSubmitError] = useState<string | null>();

    const [confirmation, setConfirmation] = useState<string | null>();

    const { toAuthorized } = useContext(AuthContext);

    const { formState, register, handleSubmit, reset, clearErrors } = useForm<{
        password: string;
        confirm: string;
    }>();

    const hasErrors = !!submitError;

    const errors = formState.errors;

    const errorMessage = (field: FieldError | undefined) => field?.message;

    const isError = (field: FieldError | string | undefined) =>
        (typeof field === "string"
            ? errors && Object.keys(errors).includes(field)
            : !!field) || hasErrors;

    const classes = useStyles();

    useEffect(() => {
        console.log(
            "Hash [%s] é um uuid? %s",
            hash,
            isUuid(hash) ? "Sim" : "Não"
        );
        if (!isUuid(hash)) {
            toAuthorized();
        }
    }, []);

    const getConfirmation = () => {
        return (
            !!confirmation && (
                <p>
                    {confirmation}{" "}
                    <LinkWrapper to="/sign-in">Click to sign in.</LinkWrapper>
                </p>
            )
        );
    };

    const getSubmitErrorMessage = () => {
        return (
            !!submitError && (
                <p>
                    {submitError}{" "}
                    <LinkWrapper to="/password-forgot">
                        Clique solicitar novamente
                    </LinkWrapper>
                    {"."}
                </p>
            )
        );
    };

    const handleChange = async ({ password, confirm }: any) => {
        try {
            setSubmitError(undefined);
            await api.patch(`/password/reset?token=${hash}`, {
                password,
            });

            await new Promise((resolve) => {
                setTimeout(resolve, 1500);
                setConfirmation("Password changed.");
                reset();
                clearErrors();
            }).catch((err) => console.error(err.data));
        } catch (error) {
            const status = error.response?.status;
            switch (status) {
                case 204:
                    setSubmitError("No content.");
                    break;
                case 403:
                    setSubmitError("Tempo para mudar a senha expirado.");
                    break;
                case 500:
                    setSubmitError("Erro na aplicação.");
                    break;
                default:
                    setSubmitError("Erro ao enviar os dados.");
            }

            console.error(
                "/PasswordReset.handleChange => status %d, %o",
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
                    <VerifiedUserOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Change your password
                </Typography>
                <form
                    onSubmit={handleSubmit(handleChange)}
                    className={classes.form}
                    noValidate
                >
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                autoFocus
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="off"
                                error={isError(errors.password)}
                                helperText={errorMessage(
                                    formState.errors.password
                                )}
                                {...register("password", {
                                    required: "A senha é um campo obrigatório.",
                                    shouldUnregister: true,
                                })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Confirm password"
                                type="password"
                                id="confirm"
                                autoComplete="off"
                                error={isError(errors.confirm)}
                                helperText={errorMessage(
                                    formState.errors.confirm
                                )}
                                {...register("confirm", {
                                    required:
                                        "A confirmação senha é um campo obrigatório.",
                                    shouldUnregister: true,
                                    //validate: {{match: {value: 'password'}}}
                                })}
                            />
                        </Grid>
                    </Grid>
                    <FormControl fullWidth>
                        <FormHelperText id="helper-text" error={hasErrors}>
                            <p>
                                {getSubmitErrorMessage() ||
                                    getConfirmation() ||
                                    "Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter."}
                            </p>
                        </FormHelperText>
                        <SubmitButton
                            name="Change password"
                            isFullWidth={true}
                            className={classes.submit}
                            isSubmitting={formState.isSubmitting}
                            isInvalid={hasErrors}
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

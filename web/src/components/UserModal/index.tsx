import Modal from "react-modal";
import { FormEvent, useContext, useState } from "react";
import {
    Container,
    Button,
    Grid,
    TextField,
    makeStyles,
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
    Icon,
    Typography,
    FormHelperText,
} from "@material-ui/core";
import { AxiosError } from "axios";
import { api } from "../../services/api";
import { withAuth } from "../../utils/withAuth";
import { AuthContext, User } from "../../context/AuthContext";
import { SubmitButton } from "../SubmitButton";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

interface IUser {
    id: string;

    type: string;

    name: string;
    email: string;
    cellphone: string;
    document: string;

    isConfirmed: boolean;
    isValid: boolean;

    isAdmin: boolean;

    updatedAt: Date;
}

Modal.setAppElement("#root");

type UserInput = Partial<User>;

type UserModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
} & UserInput;

export function UserModal(props: UserModalProps) {
    const { isOpen, onRequestClose } = props;
    const [user, setUser] = useState<Exclude<UserInput, UserModalProps>>();

    const email = user?.email;
    const isConfirmed = !!user?.confirmedAt;
    const type = user?.type;

    const canValidate =
        !!email && !!user?.document && !!type && !user.validatedAt;

    const classes = useStyles();

    function handleOpen() {
        const { id, type, email, document, confirmedAt, validatedAt } = props;
        setUser({ id, type, email, document, confirmedAt, validatedAt });
    }

    async function handleSendConfirmMail(event: FormEvent) {
        event.preventDefault();
        alert("send mail to ...");
    }

    async function handleEdit(event: FormEvent) {
        event.preventDefault();

        try {
            const response = await api.post("people", { ...user });
            setUser({ ...response.data });
            onRequestClose();
        } catch (err) {
            console.error(err.message);
        }
    }

    function handleRadio(event: any) {
        setUser({
            ...user,
            type: event.target.value,
        });
    }

    return (
        <Modal
            isOpen={isOpen}
            onAfterOpen={handleOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <div
            // className={classes.paper}
            >
                <Typography component="h1" variant="h5">
                    User
                </Typography>
                <form onSubmit={handleEdit} className={classes.form} noValidate>
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
                                // error={isError("email")}
                                // helperText={errorMessage(errors.email)}
                                value={user?.email}
                                onChange={(event) =>
                                    setUser({
                                        ...user,
                                        email: event.target.value,
                                    })
                                }
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                onClick={handleSendConfirmMail}
                                variant="contained"
                                color="default"
                                fullWidth
                                disabled={isConfirmed || !email}
                                startIcon={isConfirmed ? "" : <Icon>send</Icon>}
                            >
                                Send confirm mail
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Document: CPF/CNPJ/Passport"
                                type="text"
                                id="document"
                                // error={isError("document")}
                                // helperText={errorMessage(errors.confirmation)}
                                value={user?.document}
                                onChange={(event) =>
                                    setUser({
                                        ...user,
                                        document: event.target.value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl
                                component="fieldset"
                                error={!type}
                                fullWidth
                            >
                                <FormLabel component="legend">
                                    Person Type
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="person type"
                                    name="type"
                                >
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                value="F"
                                                checked={user?.type === "F"}
                                                onChange={handleRadio}
                                                color="primary"
                                            />
                                        }
                                        label="Individual"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                value="J"
                                                checked={user?.type === "J"}
                                                onChange={handleRadio}
                                                color="primary"
                                            />
                                        }
                                        label="Company"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <FormControl fullWidth>
                        <FormHelperText
                            id="helper-text"
                            margin="dense"
                            filled={true}
                            // error={hasErrors}
                            // color={
                            //     !hasErrors && getConfirmation() ? "primary" : ""
                            // }
                        >
                            {/* {getSubmitErrorMessage() || getConfirmation()} */}
                        </FormHelperText>
                        <SubmitButton
                            label={canValidate ? "Save and validate" : "Save"}
                            isFullWidth={true}
                            className={classes.submit}
                            isDisabled={!type || !email}
                        />
                    </FormControl>
                </form>
            </div>
        </Modal>
    );
}

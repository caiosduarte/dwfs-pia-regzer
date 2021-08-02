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
} from "@material-ui/core";
import { AxiosError } from "axios";
import { api } from "../../services/api";
import { withAuth } from "../../utils/withAuth";
import { AuthContext } from "../../context/AuthContext";

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

type UserInput = Partial<IUser>;

type UserModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
} & UserInput;

export function UserModal(props: UserModalProps) {
    const { isOpen, onRequestClose } = props;
    const [user, setUser] = useState<Exclude<UserInput, UserModalProps>>();

    const email = user?.email;
    const isConfirmed = user?.isConfirmed;
    const type = user?.type;

    const { toPublic, signOut } = useContext(AuthContext);

    const classes = useStyles();

    function handleOpen() {
        setUser({ ...props });
    }

    async function handleSendConfirmMail(event: FormEvent) {
        event.preventDefault();
        alert("send mail to ...");
    }

    async function handleEdit(event: FormEvent) {
        event.preventDefault();

        try {
            await withAuth(
                {},
                toPublic,
                api.put(`users/${user?.id}`, { ...user }),
                signOut
            );
            onRequestClose();
        } catch (error) {
            if (error.constructor.name === "AxiosError") {
                console.error("Error axios => ", error.response.data.message);
            } else {
                console.error("Error => ", error.message);
            }
        }
    }

    async function handleCreate(event: FormEvent) {
        event.preventDefault();
        //await createUser({ email, cellphone, document });
        // setType("deposit");
        // setAmount(0);
        // setCategory("");
        onRequestClose();
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
            <Container component="main" maxWidth="sm">
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
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                autoComplete="off"
                                id="document"
                                label="Document"
                                value={user?.document}
                                onChange={(event) =>
                                    setUser({
                                        ...user,
                                        document: event.target.value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12} direction="row">
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
                                    name="personType"
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
                        <Grid
                            item
                            xs={12}
                            direction="row"
                            alignItems="baseline"
                            justifyContent="center"
                            spacing={2}
                        >
                            <Button
                                onClick={handleSendConfirmMail}
                                variant="contained"
                                color="default"
                                // size="small"
                                // fullWidth
                                disabled={isConfirmed || !email}
                                startIcon={isConfirmed ? "" : <Icon>send</Icon>}
                            >
                                Send confirm mail
                            </Button>{" "}
                            <Button
                                onClick={handleEdit}
                                variant="contained"
                                color="primary"
                                disabled={!type || !email}
                                // size="small"
                                // fullWidth
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                {console.log("user updated: ", user)}
            </Container>
        </Modal>
    );
}

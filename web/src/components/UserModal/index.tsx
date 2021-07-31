import Modal from "react-modal";
import { FormEvent, useState } from "react";
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
} from "@material-ui/core";

import Title from "../Title";

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
    id: number;

    name: string;
    email: string;
    cellphone: string;
    document: string;

    isConfirmed: boolean;
    isValid: boolean;

    updatedAt: Date;
}

type IUserInput = Omit<IUser, "id" | "createdAt">;

type UserModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
    isConfirmed?: boolean;
};

export function UserModal({
    isOpen,
    onRequestClose,
    isConfirmed,
}: UserModalProps) {
    // form com Controlled Components
    const [email, setEmail] = useState<string>();
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState("");
    const [type, setType] = useState("deposit");

    const classes = useStyles();

    async function handleSendConfirmMail(event: FormEvent) {
        event.preventDefault();
        alert("send mail to ...");
    }

    async function handleEdit(event: FormEvent) {
        event.preventDefault();
    }

    async function handleCreate(event: FormEvent) {
        event.preventDefault();
        //await createTransaction({ title, amount, category, type });
        setEmail("");
        // setType("deposit");
        // setAmount(0);
        // setCategory("");
        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <Container component="main" maxWidth="sm">
                <Grid container direction="row">
                    <Grid item alignItems="flex-start">
                        <Title>User</Title>
                    </Grid>
                    <Grid item alignItems="flex-end">
                        <Button
                            type="button"
                            onClick={onRequestClose}
                            className="react-modal-close"
                        >
                            X
                        </Button>
                    </Grid>
                </Grid>

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
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                autoFocus
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
                            />
                        </Grid>
                        <Grid item xs={12} direction="row">
                            <FormControl component="fieldset" fullWidth>
                                <FormLabel component="legend">
                                    Person Type
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="person type"
                                    name="personType"

                                    // value={value}
                                    // onChange={handleChange}
                                >
                                    <FormControlLabel
                                        value="F"
                                        control={<Radio />}
                                        label="Individual"
                                    />
                                    <FormControlLabel
                                        value="J"
                                        control={<Radio />}
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
                                onClick={handleSendConfirmMail}
                                variant="contained"
                                color="primary"
                                // size="small"
                                // fullWidth
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>

            {/* <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <input
                    type="number"
                    placeholder="Valor"
                    value={amount}
                    onChange={(event) => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={() => setType("deposit")}
                        isActive={type === "deposit"}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type="button"
                        onClick={() => setType("withdraw")}
                        isActive={type === "withdraw"}
                        activeColor="red"
                    >
                        <img src={withdrawImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input
                    type="text"
                    placeholder="Categoria"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                />
                <button type="submit" onClick={handleCreateNewTransaction}>
                    Cadastrar
                </button> */}
        </Modal>
    );
}

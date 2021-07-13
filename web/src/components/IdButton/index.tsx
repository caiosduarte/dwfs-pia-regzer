import { TextField } from "@material-ui/core";

interface IdTextFieldProps {
    id?: string;
    isFullWidth?: boolean;
    type?: string;
    label?: string;
    autocomplete?: string;
    isRequired: boolean;
    isError?: boolean;
    errorMessage?: string;
}

export function IdTextField({
    id,
    isFullWidth = true,
    type = "text",
    label,
    autocomplete = id,
    isRequired = true,
    isError = false,
    errorMessage = undefined,
}: IdTextFieldProps) {
    return (
        <TextField
            variant="outlined"
            margin="normal"
            required={isRequired}
            fullWidth={isFullWidth}
            id={id}
            type={type}
            label={label}
            autoComplete={autocomplete}
            autoFocus
            error={isError}
            helperText={errorMessage}
        />
    );
}

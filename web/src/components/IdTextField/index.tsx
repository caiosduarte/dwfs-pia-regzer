import { TextField } from "@material-ui/core";

interface IdTextFieldProps {
    id?: string;
    isFullWidth?: boolean;
    type?: string;
    label?: string;
    autoComplete?: string;
    isRequired: boolean;
    isError?: boolean;
    errorMessage?: string;
    isAutoFocus?: true;
    variantName?: string;
    marginName?: string;
}

export function IdTextField({
    id = "ids",
    isFullWidth = true,
    type = "text",
    label,
    isRequired = true,
    isError = false,
    errorMessage = undefined,
    isAutoFocus = true,
    variantName,
    marginName,
    autoComplete,
}: IdTextFieldProps) {
    return (
        <TextField
            variant="outlined"
            margin="normal"
            required={isRequired || true}
            fullWidth={isFullWidth}
            id={id}
            type={type}
            label={label}
            autoComplete={autoComplete}
            autoFocus={isAutoFocus || true}
            error={isError}
            helperText={errorMessage}
        />
    );
}

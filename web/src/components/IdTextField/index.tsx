import { TextField } from "@material-ui/core";

interface IdTextFieldProps {
    id: string;
    isFullWidth?: boolean;
    type?: string;
    label?: string;
    autoComplete?: string;
    isRequired?: boolean;
    isError?: boolean;
    errorMessage?: string;
    isAutoFocus?: true;
    variant?: "standard" | "filled" | "outlined";
    margin?: "normal";
    value?: string;
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
    variant = "outlined",
    margin = "normal",
    value = "",
}: IdTextFieldProps) {
    return (
        <TextField
            variant={variant}
            margin={margin}
            required={isRequired}
            fullWidth={isFullWidth}
            id={id}
            type={type}
            label={label}
            defaultValue={value}
            autoFocus={isAutoFocus}
            error={isError}
            helperText={errorMessage}
        />
    );
}

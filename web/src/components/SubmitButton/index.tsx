import { Button, CircularProgress, FormHelperText } from "@material-ui/core";
import { Container } from "./styles";

interface SubmitButtonProps {
    isSubmitting?: boolean;
    name?: string;
    label?: string;
    isFullWidth?: boolean;
    isInvalid?: boolean;
    isSubmitted?: boolean;
    isDisabled?: boolean;
    error?: string;
    warning?: string;
    className?: string;
}

export function SubmitButton({
    name = "submit",
    label = "Submit",
    isSubmitting = false,
    isFullWidth = true,
    isInvalid = false,
    isSubmitted = false,
    isDisabled = false,
    error,
    warning,
    className,
}: SubmitButtonProps) {
    return (
        <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting || isDisabled}
            fullWidth={isFullWidth}
            className={
                className ||
                (!isInvalid && !error && isSubmitted
                    ? "buttonSuccess"
                    : "defaultSubmit")
            }
        >
            {label || name}
        </Button>
    );
}

/* 

        <Container>
            <div className="wrapper">
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth={isFullWidth}
                    className={
                        !isInvalid && !error && isSubmitted
                            ? "buttonSuccess"
                            : "submit"
                    }
                >
                    {name}
                </Button>
                {!isInvalid && isSubmitting && (
                    <CircularProgress size={24} className="buttonProgress" />
                )}
            </div>

            <FormHelperText
                className="messageContainer"
                id="helper-text"
                error={!!error}
            >
                {!!error ? error : warning}
            </FormHelperText>
        </Container>

*/

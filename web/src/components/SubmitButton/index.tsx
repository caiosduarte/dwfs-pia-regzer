import { Button, CircularProgress, FormHelperText } from "@material-ui/core";
import { Container } from "./styles";

interface SubmitButtonProps {
    isSubmitting?: boolean;
    name?: string;
    isFullWidth?: boolean;
    isInvalid?: boolean;
    isSubmitted?: boolean;
    error?: string;
    warning?: string;
}

export function SubmitButton({
    name = "Submit",
    isSubmitting = false,
    isFullWidth = true,
    isInvalid = false,
    isSubmitted = false,
    error,
    warning,
}: SubmitButtonProps) {
    return (
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
    );
}

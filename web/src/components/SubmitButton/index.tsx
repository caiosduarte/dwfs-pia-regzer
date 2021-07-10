import { Button, CircularProgress } from "@material-ui/core";
import { Container } from "./styles";

interface SubmitButtonProps {
    isSubmitting?: boolean;
    name?: string;
    isFullWidth?: boolean;
    isInvalid?: boolean;
    isSubmitted?: boolean;
}

export function SubmitButton({
    name = "Submit",
    isSubmitting = false,
    isFullWidth = true,
    isInvalid = false,
    isSubmitted = false,
}: SubmitButtonProps) {
    return (
        <Container>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                fullWidth={isFullWidth}
                className={
                    !isInvalid && isSubmitted ? "buttonSuccess" : "submit"
                }
            >
                {name}
            </Button>
            {!isInvalid && isSubmitting && (
                <CircularProgress size={24} className="buttonProgress" />
            )}
        </Container>
    );
}

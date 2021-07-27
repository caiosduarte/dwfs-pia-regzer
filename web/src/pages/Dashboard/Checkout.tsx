import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import DocumentsForm from "./DocumentsForm";
import Review from "./Review";
import Title from "./Title";
import { Grid } from "@material-ui/core";
import InfoForm from "./InfoForm";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            marginRight: theme.spacing(1),
        },
        backButton: {
            marginRight: theme.spacing(1),
        },
        completed: {
            display: "inline-block",
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    })
);

const steps = ["Documents", "Info", "Contacts", "Address", "Review"];

function getSteps() {
    return steps;
}

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <DocumentsForm />;
        case 1:
            return <InfoForm />;
        case 2:
            return <AddressForm />;
        case 3:
            return <AddressForm />;
        case 4:
            return <Review />;
        default:
            throw new Error("Unknown step");
    }
}

export default function Checkout() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState(new Set<number>());
    const [skipped, setSkipped] = React.useState(new Set<number>());
    const steps = getSteps();

    const totalSteps = () => {
        return getSteps().length;
    };

    const isStepOptional = (step: number) => {
        return step === 1;
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const skippedSteps = () => {
        return skipped.size;
    };

    const completedSteps = () => {
        return completed.size;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps() - skippedSteps();
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed
                  // find the first step that has been completed
                  steps.findIndex((step, i) => !completed.has(i))
                : activeStep + 1;

        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = new Set(completed);
        newCompleted.add(activeStep);
        setCompleted(newCompleted);

        /**
         * Sigh... it would be much nicer to replace the following if conditional with
         * `if (!this.allStepsComplete())` however state is not set when we do this,
         * thus we have to resort to not being very DRY.
         */
        if (completed.size !== totalSteps() - skippedSteps()) {
            handleNext();
        }
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted(new Set<number>());
        setSkipped(new Set<number>());
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    function isStepComplete(step: number) {
        return completed.has(step);
    }

    return (
        <React.Fragment>
            <Title>Registration</Title>
            <Stepper alternativeLabel nonLinear activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const buttonProps: { optional?: React.ReactNode } = {};
                    if (isStepOptional(index)) {
                        buttonProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepButton
                                onClick={handleStep(index)}
                                completed={isStepComplete(index)}
                                {...buttonProps}
                            >
                                {label}
                            </StepButton>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                {allStepsCompleted() ? (
                    <div>
                        <Grid container direction="row" justifyContent="center">
                            <Typography className={classes.instructions}>
                                All steps completed - you&apos;re finished
                            </Typography>
                        </Grid>
                        <Grid container direction="row" justifyContent="center">
                            <Button onClick={handleReset}>Reset</Button>
                        </Grid>
                    </div>
                ) : (
                    <>
                        {getStepContent(activeStep)}
                        <br />
                        <Grid
                            container
                            direction="row"
                            alignItems="baseline"
                            justifyContent="center"
                            spacing={2}
                        >
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.button}
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                            >
                                Next
                            </Button>
                            {isStepOptional(activeStep) &&
                                !completed.has(activeStep) && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSkip}
                                        className={classes.button}
                                    >
                                        Skip
                                    </Button>
                                )}
                            {activeStep !== steps.length &&
                                (completed.has(activeStep) ? (
                                    <Typography
                                        variant="caption"
                                        className={classes.completed}
                                    >
                                        Step {activeStep + 1} already completed
                                    </Typography>
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleComplete}
                                    >
                                        {completedSteps() === totalSteps() - 1
                                            ? "Finish"
                                            : "Complete"}
                                    </Button>
                                ))}
                        </Grid>
                    </>
                )}
            </div>
        </React.Fragment>
    );
}

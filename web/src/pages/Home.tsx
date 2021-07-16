import { useState, useContext, useEffect } from "react";
import SignIn from "../components/SignIn";
import { AuthContext } from "../context/AuthContext";
import { withGuest } from "../utils/withGuest";

export const Home = () => {
    const [isCheckIn, setIsCheckIn] = useState(true);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);

    const { checkIn, signIn, toAuthorized } = useContext(AuthContext);

    useEffect(() => {
        withGuest(toAuthorized);
    }, [toAuthorized]);

    const handleSubmit = async (data: any) => {
        try {
            if (isSignIn) {
                //await signIn({ email, password });
            } else if (isSignUp) {
                //await signUp({ email, password });
            } else if (isCheckIn) {
                try {
                    const { email } = data;
                    await checkIn({
                        email,
                    });
                    setIsSignIn(true);
                    setIsSignUp(false);
                    setIsCheckIn(false);
                } catch {
                    setIsSignIn(true);
                    setIsSignUp(false);
                    setIsCheckIn(false);
                }
            }
        } catch (error) {
            console.log("/ => ", error);
        }
    };

    return (
        <>
            {(isCheckIn || isSignIn) && (
                <SignIn
                    isSignIn={isSignIn}
                    onSubmit={signIn}
                    afterSubmit={handleSubmit}
                    beforeSubmit={async () => {
                        await new Promise((resolve) =>
                            setTimeout(resolve, 2000)
                        );
                    }}
                />
            )}
        </>
    );
};

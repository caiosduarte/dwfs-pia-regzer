import { useState, useContext, useEffect } from "react";
import SignIn from "../components/SignIn";
import { AuthContext } from "../context/AuthContext";
import { withGuest } from "../utils";

export const Home = () => {
    const [isCheckIn, setIsCheckIn] = useState(true);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);

    const { canCheckIn, canSignIn, signIn, signUp, toAuthorized } =
        useContext(AuthContext);

    useEffect(() => {
        withGuest(toAuthorized);
    }, [toAuthorized]);

    const handleSubmit = async (data: any) => {
        try {
            console.log("canSignIn() =>", canSignIn());

            if (isSignIn) {
                //await signIn({ email, password });
            } else if (isSignUp) {
                //await signUp({ email, password });
            } else if (isCheckIn) {
                const { email } = data;
                const isUserExists = await canCheckIn({
                    email,
                });
                setIsSignIn(isUserExists);
                setIsSignUp(!isUserExists);
                setIsCheckIn(!isUserExists);
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

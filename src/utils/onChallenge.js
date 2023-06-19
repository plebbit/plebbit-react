import React, { useState } from "react";
import ReactDOM from "react-dom";
import GetChallengeAnswersFromUser from "./getChallengeAnswersFromUser";
import logger from "./logger";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../assets/style/theme";

const ModalContainer = ({ challenges, comment, onComplete }) => {
    const [isMounted, setIsMounted] = useState(true);

    const handleCloseModal = () => {
        setIsMounted(false);
    };

    return (
        <>
            { isMounted && (
                <ChakraProvider theme={ theme }>
                    <GetChallengeAnswersFromUser
                        challenges={ challenges }
                        comment={ comment }
                        onComplete={ (answers) => {
                            handleCloseModal();
                            onComplete(answers);
                        } }
                    />
                </ChakraProvider>
            ) }
        </>
    );
};

const onChallenge = async (challenges, comment) => {
    console.log("here", comment);
    try {
        const challengeAnswers = await new Promise((resolve, reject) => {
            const handleComplete = (answers) => {
                resolve(answers);
            };

            // Create a container element
            const modalRoot = document.createElement("div");
            modalRoot.id = "modal-root";
            document.body.appendChild(modalRoot);

            // Render the modal container
            ReactDOM.render(
                <ModalContainer
                    challenges={ challenges }
                    comment={ comment }
                    onComplete={ handleComplete }
                />,
                modalRoot
            );
        });

        // Publish the challenge answers
        await comment.publishChallengeAnswers(challengeAnswers);
    } catch (error) {
        // Handle any errors during the challenge process
        logger("challenge error", error, "error");
    } finally {
        // Clean up the modal container
        const modalRoot = document.getElementById("modal-root");
        ReactDOM.unmountComponentAtNode(modalRoot);
        modalRoot.remove();
    }
};

export default onChallenge;

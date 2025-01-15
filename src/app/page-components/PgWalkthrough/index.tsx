import './index.css';

import { useEffect, useState } from 'react';
import Joyride, { ACTIONS, EVENTS, ORIGIN, STATUS, CallBackProps, Step } from 'react-joyride';

import { usePlaygroundContext } from "../PlaygroundContext";

const primaryColor = '#007bff';
const labels = {
    last: 'Done',
}



const steps: Step[] = [
    {
        target: '.select-query-label',
        content: 'Select a sample query from the popup',
    },
    {
        target: '.pg-query-card',
        content: 'Here you can view or edit your Redis query',
    },
    {
        target: '.pg-db-index-card',
        content: 'View respective index for your Redis query',
    },
    {
        target: '.pg-data-source-card',
        content: 'View sample source data for your Redis query',
    },
    {
        target: '.header-run-btn',
        content: 'Run your Redis query',
    },
    {
        target: '.pg-result-card',
        content: 'View results of your Redis query after running it',
        // disableBeacon: true,
    },

];

const PgWalkthrough = () => {

    const { runTour, setRunTour, fnSetTourCompleted } = usePlaygroundContext();
    const [stepIndex, setStepIndex] = useState(0);


    const endTour = () => {
        setRunTour(false);
        fnSetTourCompleted(true);
        setStepIndex(0);
    }

    const handleJoyrideCallback = (data: CallBackProps) => {
        //https://github.com/gilbarbara/react-joyride/blob/main/docs/callback.md
        const { action, index, origin, status, type } = data;

        if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
            setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
        } else if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
            endTour();
        }
    };



    useEffect(() => {

        // Add keyboard navigation
        const handleKeyPress = (event: KeyboardEvent) => {

            if (runTour) {
                switch (event.key) {
                    case 'ArrowLeft':
                        setStepIndex(prevIndex => Math.max(0, prevIndex - 1));

                        break;
                    case 'ArrowRight':
                        setStepIndex(prevIndex => Math.min(steps.length - 1, prevIndex + 1));

                        break;
                    case 'Escape':
                        endTour();
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [runTour]);

    return (
        <Joyride
            steps={steps}
            run={runTour}
            continuous={true}
            showProgress={true}
            showSkipButton={true}
            stepIndex={stepIndex}
            callback={handleJoyrideCallback}
            styles={{
                options: {
                    // arrowColor: '#e3ffeb',
                    // backgroundColor: '#e3ffeb',
                    // overlayColor: 'rgba(79, 26, 0, 0.4)',
                    // textColor: '#004a14',

                    primaryColor: primaryColor,
                },
            }}
            locale={{
                last: labels.last,
            }}
        />
    )
}

export default PgWalkthrough;
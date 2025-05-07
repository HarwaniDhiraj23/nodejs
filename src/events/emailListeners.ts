import { appEmitter } from "./userEvents";


export const registerEmailListeners = () => {
    appEmitter.on('emailSent', (email, subject) => {
        console.log(`📨 Event: Email sent to ${email} with subject "${subject}"`);
    });
};

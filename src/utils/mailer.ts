import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import fs from 'fs/promises';
import { appEmitter } from '../events/userEvents';

export const sendMail = async (to: string, subject: string, templateData: { header: string, title: string, name: string, otp: string | number, expiresIn: number, timeUnit: string, text: string }) => {
    try {
        const templatePath = path.join(__dirname, '../', 'templates', 'otpTemplate.ejs');
        const template = await fs.readFile(templatePath, 'utf-8');

        const html = ejs.render(template, templateData);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            from: `"TODO" <${process.env.EMAIL}>`,
            to,
            subject,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.messageId);

        appEmitter.emit('emailSent', to, subject);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

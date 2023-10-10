import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import EmailTemplateType from './emailTemplateType.enum';
import { SES, SendRawEmailCommand } from '@aws-sdk/client-ses';
// import { defaultProvider } from '@aws-sdk/credential-provider-node';

const senderEmail = process.env.SENDER_EMAIL;

const ses = new SES({
    apiVersion: '2010-12-01',
    region: 'ap-southeast-1',
    credentials: {
        accessKeyId: process.env.EMAIL_USERNAME,
        secretAccessKey: process.env.EMAIL_PASSWORD,
    },
});

// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
    SES: { ses, aws: { SendRawEmailCommand } },
});

interface IEmailTemplate {
    subject: string;
    html: string;
    variables: string[];
}

export default class EmailUtil {
    /**
     * Sends an email by generating content through a json file, and substituting the provided variables.
     * @param receiverEmail The email address of the receiver.
     * @param emailTemplate The json email template to be used.
     * @param templateVariables The variables to be substituted. Take a look at the json file for more info.
     * @returns Boolean indicating success status of sending the email.
     */
    public static async sendEmail(
        receiverEmail: string,
        emailTemplate: EmailTemplateType,
        templateVariables?: Record<string, unknown>,
    ): Promise<string> {
        const mailOptions = this.generateMailOptions(
            senderEmail,
            receiverEmail,
            emailTemplate,
            templateVariables,
        );

        return await this.handleSendEmail(mailOptions);
    }

    private static generateMailOptions(
        senderEmail: string,
        receiverEmail: string,
        emailTemplate: EmailTemplateType,
        templateVariables?: Record<string, unknown>,
    ): Mail.Options {
        const template = require(
            `./emailTemplates/${emailTemplate}.json`,
        ) as IEmailTemplate;

        const templateCopy = Object.assign({}, template);

        for (const variable of template.variables) {
            if (!(variable in templateVariables)) {
                throw Error(
                    `Missing variables in replacement data: ${variable}`,
                );
            }

            const replacementValue = templateVariables[`${variable}`] as string;
            const regex = new RegExp(`{{${variable}}}`, 'g');

            templateCopy.subject = templateCopy.subject.replace(
                regex,
                replacementValue,
            );
            templateCopy.html = templateCopy.html.replace(
                regex,
                replacementValue,
            );
        }

        const mailOptions: Mail.Options = {
            from: senderEmail,
            to: receiverEmail,
            subject: templateCopy.subject,
            html: templateCopy.html,
        };

        return mailOptions;
    }

    /**
     * Sends an email according to the specified mail options
     * @param mailOptions Object containing information like sender, receiver, and email content.
     * @returns Boolean indicating whether email is sent.
     */
    private static async handleSendEmail(
        mailOptions: Mail.Options,
    ): Promise<string> {
        try {
            const result = await transporter.sendMail(mailOptions);
            return `Message sent: ${result.messageId}`;
        } catch (error) {
            throw new Error(`Failed to send email: ${error}`);
        }
    }
}

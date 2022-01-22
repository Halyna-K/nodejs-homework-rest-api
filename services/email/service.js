import Mailgen from "mailgen"

export class EmailService {
    constructor (env, sender) {
        this.sender = sender
        switch (env) {
            case 'development':
                this.link = 'http://localhost:3000/'
                break
            case 'test':
                this.link = 'http://localhost:5000/'
                break
            case 'production':
                this.link = 'http://heroku/'
                break
            default:
                this.link = 'http://localhost:3000/'
        }
    }

    createEmailTemplate (username, verificationToken) {
        const mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'Halyna',
                link: this.link
            }
        })

        const email = {
            body: {
                name:username,
                intro: "Welcome! We're very excited to have you on board.",
                action: {
                    instructions: 'To get started with our API, please click here:',
                    button: {
                        color: '#22BC66',
                        text: 'Confirm your account',
                        link: `${this.link}/api/users/verify/${verificationToken}`
                    },
                },
                outro: 'If you need help, write us!'
            },
        }
            return mailGenerator.generate(email);
    }

    async sendVerificationEmail (email, username, verificationToken) {
        const emailBody = this.createEmailTemplate(username, verificationToken)
        const msg = {
            to: email,
            subject: 'Verify email',
            html: emailBody
        }
    try {
        const result = await this.sender.send(msg)
        console.log(result);
        return  true
    } catch (error) {
        console.error(error.message);
        return false
    }
    }
}

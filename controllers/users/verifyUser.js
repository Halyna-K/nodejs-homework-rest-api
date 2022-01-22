import { HttpCode } from '../../lib/constants'
import repositoryUsers from '../../repository/users'
import { EmailService, SenderSendgrid } from '../../services/email'

const verifyUser = async (req, res, next) => {
    const verificationToken = req.params.token
    const userFromToken = await repositoryUsers.findByVerificationToken(verificationToken)
    if (userFromToken) {
        await repositoryUsers.updateVerification(userFromToken.id, true)

        return res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            data: { message: 'Verification successful' },
        })
    }

    res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        data: { message: 'User not found' },
    })
}

const repeatEmailVerifyUser = async (req, res, next) => {
    const { email } = req.body
    const user = await repositoryUsers.findByEmail(email)
    if (user) {
        const  {email, name, verificationToken} = user

        const emailService = new EmailService(process.env.NODE_ENV, new SenderSendgrid())

        const isSend = await emailService.sendVerificationEmail( email, name, verificationToken )

        if (isSend) {
        return res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            data: { message: 'Verification email sent' }
        })
        }
        res.status(HttpCode.UE).json({
            status: 'error',
            code: HttpCode.UE,
            data: { message: 'Verification has already been passed' },
        })
    }

    res.status(HttpCode.BAD_REQUEST).json({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
        data: { message: 'missing required field email' },
    })

}

export { verifyUser, repeatEmailVerifyUser }

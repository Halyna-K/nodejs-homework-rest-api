import { HttpCode } from '../../lib/constants'
import repositoryUsers from '../../repository/users'
import { EmailService, SenderSendgrid } from '../../services/email'
import { CustomError } from '../../lib/custom-error'

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
    throw new CustomError(HttpCode.NOT_FOUND, 'User not found' )
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
            throw new CustomError(HttpCode.BAD_REQUEST, 'Verification already has been passed' )
    }
        throw new CustomError(HttpCode.BAD_REQUEST, 'missing required field email' )
}

export { verifyUser, repeatEmailVerifyUser }

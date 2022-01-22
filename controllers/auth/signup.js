import { HttpCode } from '../../lib/constants'
import authService from '../../services/auth'
import { EmailService, SenderSendgrid } from '../../services/email'

export const signup = async (req, res, next) => {
    try {
    const {email} = req.body
    const isUserExist = await authService.isUserExist(email)
    if (isUserExist) {
        return res.status(HttpCode.CONFLICT).json({status: 'error', code: HttpCode.CONFLICT, message: 'Email in use' })
    }
    const userData = await authService.create(req.body)

    const emailService = new EmailService(process.env.NODE_ENV, new SenderSendgrid())

    const isSend = await emailService.sendVerificationEmail( email, userData.name, userData.verificationToken )

    delete userData.verificationToken

    res.status(HttpCode.CREATED).json( {status: 'success', code: HttpCode.CREATED, data: {...userData, isSendVerify: isSend }} )
    } catch (err) {
    next (err)
}
}

import { HttpCode } from '../../lib/constants'
import authService from '../../services/auth'
import { CustomError } from '../../lib/custom-error'

export const login = async (req, res, next) => {
        const { email, password } = req.body
        const user = await authService.getUser(email, password)
        if (!user) {
            throw new CustomError(HttpCode.UNAUTHORIZED, 'Email or password is wrong' )
        }
        const token = authService.getToken(user)

        await authService.setToken(user.id, token)

        res.status(HttpCode.OK).json({status: 'success', code: HttpCode.OK, data: {token} })
}

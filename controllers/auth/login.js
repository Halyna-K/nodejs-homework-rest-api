import { HttpCode } from '../../lib/constants'
import authService from '../../services/auth'

export const login = async (req, res, next) => {
    try {
    const { email, password } = req.body
    const user = await authService.getUser(email, password)
    if (!user) {
        return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Email or password is wrong',
        })
  }
  const token = authService.getToken(user)
  await authService.setToken(user.id, token)
    res.status(HttpCode.OK).json({status: 'success', code: HttpCode.OK, data: {token} })
    } catch (err) {
    next (err)
}
}

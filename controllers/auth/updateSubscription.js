import { HttpCode } from '../../lib/constants'
import authService from '../../services/auth'

export const updateSubscription = async (req, res, next) => {
  try {
      const { id, subscription } = req.body;
    const { name, email } = await authService.updateUserSubscription(
      id,
      subscription,
    );
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { id, name, email, subscription },
    })
  } catch (err) {
    next (err)
  }
}

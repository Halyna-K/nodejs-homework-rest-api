import { Router } from 'express'
import guard from '../../../midllewares/guard'
import { upload } from '../../../midllewares/upload'
import { uploadAvatar, verifyUser, repeatEmailVerifyUser } from '../../../controllers/users/index'
import wrapperError from '../../../midllewares/wrapperError'

const router = new Router()

router.patch('/avatars', guard, upload.single('avatar'), wrapperError(uploadAvatar))
router.get('/verify/:token', wrapperError(verifyUser))
router.post('/verify', wrapperError(repeatEmailVerifyUser))


export default router

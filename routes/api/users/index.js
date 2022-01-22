import { Router } from 'express'
import guard from '../../../midllewares/guard'
import { upload } from '../../../midllewares/upload'
import { uploadAvatar, verifyUser, repeatEmailVerifyUser } from '../../../controllers/users/index'

const router = new Router()

router.patch('/avatars', guard, upload.single('avatar'), uploadAvatar)
router.get('/verify/:token', verifyUser)
router.post('/verify', repeatEmailVerifyUser )


export default router

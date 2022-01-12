import { Router } from 'express'
import guard from '../../../midllewares/guard'
import { upload } from '../../../midllewares/upload'
import { uploadAvatar } from '../../../controllers/users/index'

const router = new Router()

router.patch('/avatars', guard, upload.single('avatar'), uploadAvatar)


export default router

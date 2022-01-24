import { Router } from 'express'
import { validatorCreate, validatorSubscription, validatorUpdateSubscription, validatorToken} from '../../../midllewares/validation/userValidation'
import {signup, login, logout, current, updateSubscription} from '../../../controllers/auth/index'
import guard from '../../../midllewares/guard'
import subscriptionAccess from '../../../midllewares/subscriptionAccess'
import { Subscription } from '../../../lib/constants'
import wrapperError from '../../../midllewares/wrapperError'

const router = new Router()

router.patch('/', [guard, subscriptionAccess(Subscription.PRO), validatorUpdateSubscription], wrapperError(updateSubscription))

router.post('/signup', validatorCreate, wrapperError(signup))
router.post('/login', validatorSubscription, wrapperError(login))
router.post('/logout', guard, wrapperError(logout))

router.get('/current', [guard, validatorToken], wrapperError(current))

export default router

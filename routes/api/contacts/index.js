import { Router } from 'express'
import { validatorCreate, validatorId, validatorUpdate, validatorUpdateFavorite, validatorQuery} from '../../../midllewares/validation/contactValidation'
import {getContacts, getContactById, addContact, removeContact, updateContact} from '../../../controllers/contacts/index'
import guard from '../../../midllewares/guard'
import wrapperError from '../../../midllewares/wrapperError'

const router = new Router()

router.get('/', [guard,validatorQuery], wrapperError(getContacts))

router.get('/:id', [guard, validatorId], wrapperError(getContactById))

router.post('/', [guard, validatorCreate], wrapperError(addContact))

router.delete('/:id', [guard, validatorId], wrapperError(removeContact))

router.put('/:id', [guard, validatorId, validatorUpdate], wrapperError(updateContact))

router.patch('/:id/favorite', [guard, validatorId, validatorUpdateFavorite], wrapperError(updateContact))

export default router

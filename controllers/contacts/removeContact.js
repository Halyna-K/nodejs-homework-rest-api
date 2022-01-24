import repositoryContacts from '../../repository/contacts'
import { HttpCode } from '../../lib/constants'
import { CustomError } from '../../lib/custom-error'

export const removeContact = async (req, res, next) => {
    const {id} = req.params
    const {id: userId} = req.user
    const contact = await repositoryContacts.removeContact(userId, id)
     if (contact) {
       return res.status(HttpCode.OK).json({status: 'success', code: HttpCode.OK, data: {contact},message: "Contact deleted" })
      }
      throw new CustomError(HttpCode.NOT_FOUND, `Couldn't delete contact with id: ${id}, because it's NOT FOUND` )
}

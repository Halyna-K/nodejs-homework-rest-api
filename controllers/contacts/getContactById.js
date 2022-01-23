import repositoryContacts from '../../repository/contacts'
import { HttpCode } from '../../lib/constants'
import { CustomError } from '../../lib/custom-error'

export const getContactById = async (req, res, next) => {
    const {id} = req.params
    const {id: userId} = req.user
    const contact = await repositoryContacts.getContactById(userId, id)
    console.log(contact)
     if (contact) {
       return res.status(HttpCode.OK).json({status: 'success', code: HttpCode.OK, data: {contact} })
     }
     throw new CustomError(HttpCode.NOT_FOUND, `Not found contact with id: ${id}` )
}

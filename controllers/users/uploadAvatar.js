import { HttpCode } from '../../lib/constants'
import { UploadFileService, LocalFileStorage } from '../../services/fileStorage'

export const uploadAvatar = async (req, res, next) => {
 const uploadService = new UploadFileService(
   LocalFileStorage,
   req.file,
   req.user)
 const avatarURL = await uploadService.updateAvatar()

  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: { avatarURL },
  });
}

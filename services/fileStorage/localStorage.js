import path from 'path'
import fs from 'fs/promises'
import Users from '../../repository/users'

class LocalStorage {
    constructor (file, user) {
        this.userId = user.id
        this.fileName = file.filename
        this.filePath = file.path
        this.folderAvatars = process.env.FOLDER_FOR_AVATARS
    }

    async save () {
        const destination = path.join(this.folderAvatars, this.userId)
        await fs.mkdir(destination, { recursive: true })
        await fs.rename(this.filePath, path.join(destination, this.fileName))
        const avatarUrl = path.normalize(path.join(this.userId, this.fileName))
        await Users.updateAvatar(this.userId, avatarUrl)
        return avatarUrl
       }

}

export default LocalStorage

import User from "../models/user/user";

const findById = async (id) => {
    return await User.findById(id)
}
const findByEmail = async (email) => {
    return await User.findOne({ email })
}
const findByVerificationToken = async (verificationToken) => {
   return await User.findOne({ verificationToken })
}
const create = async (body) => {
    const user = new User(body)
    return await user.save()
}
const updateUserSubscription = async (id, subscription) => {
    return await User.findOneAndUpdate(
      { _id: id },
      { subscription },
      { new: true },
    );
  };
const updateToken = async (id, token) => {
    return await User.updateOne({_id: id}, {token})
}
const updateVerification = async (id, status ) => {
   return await User.updateOne({_id: id}, {verify: status, verificationToken: null})
}
const updateAvatar = async (id, avatar) => {
    return await User.updateOne({_id: id}, {avatar})
}

export default {findById, findByEmail, create, updateUserSubscription, updateToken, updateAvatar, findByVerificationToken, updateVerification }

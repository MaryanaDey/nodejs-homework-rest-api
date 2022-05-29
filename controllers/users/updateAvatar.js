// const path = require("path");
// const fs = require("fs/promises");
// const Jimp = require("jimp");

// const { User } = require("../../models");

// const imageDir = path.join(__dirname, "../../", "public", "avatars");

// const updateAvatar = async (req, res, next) => {
//   const { path: tempUpload, originalname } = req.file;
//   const { _id } = req.user;
//   const avatarName = `${_id}_${originalname}`;

//   const image = await Jimp.read(tempUpload);
//   image.resize(250, 250).write(tempUpload);

//   try {
//     const resultUpload = path.join(imageDir, avatarName);
//     await fs.rename(tempUpload, resultUpload);
//     const avatarURL = path.join("public", "avatars", avatarName);
//     await User.findByIdAndUpdate(_id, { avatarURL });
//     res.status(200).json({ avatarURL });
//   } catch (error) {
//     await fs.unlink(tempUpload);
//     next(error);
//   }
// };
// module.exports = updateAvatar;
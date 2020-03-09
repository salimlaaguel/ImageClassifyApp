const Image = require('../../models/image');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

const images = async imageIds => {
  try {
    const images = await Image.find({ _id: { $in: imageIds } });
    return images.map(image => {
      return transformImage(image);
    });
  } catch (err) {
    throw err;
  }
};

const singleImage = async imageId => {
  try {
    const image = await Image.findById(imageId);
    return transformImage(image);
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      password: null,
      postedImages: images.bind(this, user._doc.postedImages)
    };
  } catch (err) {
    throw err;
  }
};

const transformImage = image => {
  return {
    ...image._doc,
    _id: image.id,
    date: dateToString(image._doc.date),
    poster: user.bind(this, image.poster)
  };
};

const transformLabel = label => {
  return {
    ...label._doc,
    _id: label.id,
    user: user.bind(this, label._doc.user),
    image: singleImage.bind(this, label._doc.image),
    createdAt: dateToString(label._doc.createdAt),
    updatedAt: dateToString(label._doc.updatedAt)
  };
};

exports.transformImage = transformImage;
exports.transformLabel = transformLabel;

// exports.user = user;
// exports.images = images;
// exports.singleImage = singleImage;

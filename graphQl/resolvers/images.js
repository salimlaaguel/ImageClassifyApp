//The posting and querying of images is handled here
//The images posted are

const Image = require('../../models/image');
const User = require('../../models/user');

const { transformImage } = require('./merge');

module.exports = {
  images: async () => {
    try {
      const images = await Image.find();
      return images.map(image => {
        return transformImage(image);
      });
    } catch (err) {
      throw err;
    }
  },
  postImage: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const image = new Image({
      title: args.imageInput.title,
      question: args.imageInput.question,
      done: false,
      date: new Date(args.imageInput.date),
      poster: req.userId
    });
    let postedImage;
    try {
      const result = await image.save();
      postedImage = transformImage(result);
      const poster = await User.findById(req.userId);

      if (!poster) {
        throw new Error('User not found.');
      }
      poster.postedImages.push(image);
      await poster.save();

      return postedImage;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};

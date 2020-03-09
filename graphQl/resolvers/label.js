const Image = require('../../models/image');
const Label = require('../../models/label');
const { transformLabel, transformImage } = require('./merge');

module.exports = {
  labels: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const labels = await Label.find();
      return labels.map(label => {
        return transformLabel(label);
      });
    } catch (err) {
      throw err;
    }
  },

  labelImage: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const label = new Label({
      answer: args.labelInput.answer,
      user: req.userId,
      //TODO: The imageId is hard coded here, find a way to retrieve the imageId
      //from the labelInput (args.labelInput.imageId did not work)
      image: args.labelInput.image
    });
    let imageLabel;
    try {

      const result = await label.save();
      imageLabel = transformLabel(result);
      const image = await Image.findById(args.labelInput.image); //imageId hardcoded here also

      if (!image) {
        throw new Error('Image not found.');
      }
      //TODO: push a true Boolean into the done parameter when the labeling is done
      image.imageLabels.push(label);
      await image.save();

      return imageLabel;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  cancelLabel: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const label = await Label.findById(args.labelId).populate('image');
      const image = transformImage(label.image);
      await Label.deleteOne({ _id: args.labelId });
      return image;
    } catch (err) {
      throw err;
    }
  }
};

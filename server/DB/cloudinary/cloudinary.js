import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const saveImgToCloud = async (img) => {
  try {
    if (!img) {
      console.error("No image provided");
      return null;
    }

    const fileType = img.type.split('/')[0];
    if (fileType !== 'image') {
      console.error("File is not an image");
      return null;
    }

    const arrayBuffer = await img.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const image = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "recipeImage" }, (err, uploadRes) => {
        if (err) {
          return reject(err);
        }
        resolve(uploadRes);
      }).end(buffer);
    }).then(uploadedImg => {
      return {
        image_url: uploadedImg.url,
        image_public_id: uploadedImg.public_id
      };
    }).catch(err => {
      console.error("Error uploading to Cloudinary:", err);
      return null;
    });
    console.log(image)
    return image;
  } catch (error) {
    console.error("Error processing the image:", error);
    return null;
  }
};

export { saveImgToCloud };

const express = require('express');
const cors = require('cors');
const Jimp = require('jimp');
const fs = require('fs');
const Replicate = require('replicate');
const cloudinary = require('cloudinary').v2;
require('dotenv').config("/server/.env");
// console.log(process.env)
// App Config
const app = express();
app.use(cors());
app.use(express.json());

// 



app.post('/process-image', async (req, res) => {
  try {
    // Get Original Image URL
    const originalImageURL = req.body.originalImageURL;
    const originalImageName = req.body.originalImageName;
    const storageRef = req.body.storageRef;

    // Perform image processing using Jimp
    const image = await Jimp.read(originalImageURL);

    // Get image dimensions
    const width = image.getWidth();
    const height = image.getHeight();

    // Create an array to store spot information
    const spots = [];

    // Task 1: Turn every pixel of the image to black
    image.scan(0, 0, width, height, function (x, y, idx) {
      this.bitmap.data[idx] = 0; // Red channel
      this.bitmap.data[idx + 1] = 0; // Green channel
      this.bitmap.data[idx + 2] = 0; // Blue channel
    });

    // Task 2: Draw white spots of radius = n, spot coordinates = x, y
    const n = 5; // Number of spots
    const minRadius = 40;
    const maxRadius = 50;

    for (let i = 0; i < n; i++) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);
      const radius = Math.floor(Math.random() * (maxRadius - minRadius + 1)) + minRadius;

      spots.push({ x, y, radius });

      // Change pixels to white color in the specified region
      for (let r = -radius; r <= radius; r++) {
        for (let c = -radius; c <= radius; c++) {
          const px = x + c;
          const py = y + r;

          if (px >= 0 && px < width && py >= 0 && py < height) {
            const index = image.getPixelIndex(px, py);
            image.bitmap.data[index] = 255; // Red channel
            image.bitmap.data[index + 1] = 255; // Green channel
            image.bitmap.data[index + 2] = 255; // Blue channel
          }
        }
      }
    }

    // Save modified image with spots
    let mime;
    if (originalImageName.endsWith('.png')) {
      mime = Jimp.MIME_PNG;
    }
    else if (originalImageName.endsWith('.jpg') || originalImageName.endsWith('.jpeg')) {
      mime = Jimp.MIME_JPEG;
    }
    const converted64 = await image.getBase64Async(mime);

    // Upload the image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(converted64, {
      public_id: "modified_" + originalImageName,
      resource_type: 'auto',
    });
    const url = cloudinaryResponse.secure_url;
    console.log("meh : ",url);
    
    // Replicate
    const output = await replicate.run(
      "stability-ai/stable-diffusion-inpainting:c11bac58203367db93a3c552bd49a25a5418458ddffb7e90dae55780765e26d6",
      {
        input: {
          prompt: "Race Against the Clock",
          image: originalImageURL,
          mask: url,
          height: height,
          width: width,
        }
      }
    );
    
    // console.log('output', output);
    const cloudinaryResponse1 = await cloudinary.uploader.upload(output[0], {
      public_id: "processed_" + originalImageName,
      resource_type: 'auto',
    });
    const url1 = cloudinaryResponse1.secure_url;
    console.log(url1);

    res.status(200).json({ url, spots });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Image processing failed.'});
  }
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
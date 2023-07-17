const express = require('express');
const cors = require('cors');
const Jimp = require('jimp');
const fs = require('fs');
const Replicate = require('replicate');
const cloudinary = require('cloudinary').v2;
require('dotenv').config("/server/.env");

// App Config
const app = express();
app.use(cors());
app.use(express.json());

// Cloudinary config (move to other file)
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

// Replicate config (move to other file)
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Process Image Endpoint
app.post('/process-image', async (req, res) => {
  try {
    // Get Original Image URL
    const originalImageURL = req.body.originalImageURL;

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

      // Task 2: Draw squares of width = n, square coordinates = x, y
      const n = 5; // Number of squares
      const minWidth = 80;
      const maxWidth = 100;
      const minHeight = 60;
      const maxHeight = 80;

      for (let i = 0; i < n; i++) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        const squareWidth = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
        const squareHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

        spots.push({ x, y, width: squareWidth, height: squareHeight });

        // Change pixels to white color in the specified square region
        for (let r = 0; r < squareHeight; r++) {
          for (let c = 0; c < squareWidth; c++) {
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

    // Extracting file name from URL
    const fileName = originalImageURL.split('/').pop().split('?')[0];

    // Defining Jimp.mime type
    let mime;
    if (fileName.endsWith('.png')) {
      mime = Jimp.MIME_PNG;
    }
    else if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
      mime = Jimp.MIME_JPEG;
    }

    // Converting Image to Base64 for Cloudinary
    const converted64 = await image.getBase64Async(mime);

    // Upload the image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(converted64, {
      public_id: "modified_"+fileName,
      resource_type: 'auto',
    });

    // Image URL for modified image
    const url = cloudinaryResponse.secure_url;
    console.log(url);
    
    // Content Aware Filling using Replicate
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
    
    // Upload Processed image to Cloudinary
    const cloudinaryResponse1 = await cloudinary.uploader.upload(output[0], {
      public_id: "processed_" + fileName,
      resource_type: 'auto',
    });

    // Image URL for processed image    
    const url1 = cloudinaryResponse1.secure_url;

    // Logs for Testing
    // console.log(url)
    // console.log(url1)
    // console.log(spots)

    // Response
    res.status(200).json({ url1, spots });
  } catch (error) {
    
    console.error('Error processing image:', error);
    
    // Error Response
    res.status(500).json({ error: 'Image processing failed.'});
  }
});

// Server
app.listen(5000, () => {
  console.log('Server listening on port 5000');
});

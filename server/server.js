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
    
    // const len1 = req.body.images.length;
    // const urls = req.body.images;
    // const allSpots = [];
    // const sizes = [];
    // for (let i = 0; i < len1; i++) {
    
    //   // Perform image processing using Jimp
    //   const image = await Jimp.read(urls[i]);

    //     // Get image dimensions
    //     const width = image.getWidth() - 20;
    //     const height = image.getHeight() - 20;
    //     sizes.push([image.getWidth(),image.getHeight()]);
    //     // Create an array to store spot information
    //     const spots = [];

    //     // Task 1: Turn every pixel of the image to black
    //     image.scan(0, 0, image.getWidth(), image.getHeight(), function (x, y, idx) {
    //       this.bitmap.data[idx] = 0; // Red channel
    //       this.bitmap.data[idx + 1] = 0; // Green channel
    //       this.bitmap.data[idx + 2] = 0; // Blue channel
    //     });

    //     // Task 2: Draw squares of width = n, square coordinates = x, y
    //     const n = 6; // Number of squares
    //     const minWidth = 80;
    //     const maxWidth = 100;
    //     const minHeight = 60;
    //     const maxHeight = 80;

    //     for (let i = 0; i < n; i++) {
    //       const x = Math.floor(Math.random() * width);
    //       const y = Math.floor(Math.random() * height);
    //       const squareWidth = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
    //       const squareHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

    //       spots.push({ x, y, width: squareWidth, height: squareHeight });

    //       // Change pixels to white color in the specified square region
    //       for (let r = 0; r < squareHeight; r++) {
    //         for (let c = 0; c < squareWidth; c++) {
    //           const px = x + c;
    //           const py = y + r;

    //           if (px >= 0 && px < width && py >= 0 && py < height) {
    //             const index = image.getPixelIndex(px, py);
    //             image.bitmap.data[index] = 255; // Red channel
    //             image.bitmap.data[index + 1] = 255; // Green channel
    //             image.bitmap.data[index + 2] = 255; // Blue channel
    //           }
    //         }
    //       }
    //     }

    //   // Extracting file name from URL
    //   const fileName = urls[i].split('/').pop().split('?')[0];

    //   // Defining Jimp.mime type
    //   let mime;
    //   if (fileName.endsWith('.png')) {
    //     mime = Jimp.MIME_PNG;
    //   }
    //   else if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
    //     mime = Jimp.MIME_JPEG;
    //   }

    //   // Converting Image to Base64 for Cloudinary
    //   const converted64 = await image.getBase64Async(mime);

    //   // Upload the image to Cloudinary
    //   const cloudinaryResponse = await cloudinary.uploader.upload(converted64, {
    //     public_id: "modified_"+fileName,
    //     resource_type: 'auto',
    //   });

    //   // Image URL for modified image
    //   const url = cloudinaryResponse.secure_url;
    //   console.log(`url${i} = ${url}`)
      
    //   // Content Aware Filling using Replicate
    //   const output = await replicate.run(
    //     "stability-ai/stable-diffusion-inpainting:c11bac58203367db93a3c552bd49a25a5418458ddffb7e90dae55780765e26d6",
    //     {
    //       input: {
    //         prompt: "Race Against the Clock",
    //         image: urls[i],
    //         mask: url,
    //         height: image.getHeight(),
    //         width: image.getWidth(),
    //       }
    //     }
    //   );
      
    //   // Upload Processed image to Cloudinary
    //   const cloudinaryResponse1 = await cloudinary.uploader.upload(output[0], {
    //     public_id: "processed_" + fileName,
    //     resource_type: 'auto',
    //   });

    //   // Image URL for processed image    
    //   const url1 = cloudinaryResponse1.secure_url;
      
    //   // Push modified image URL to urls array
    //   urls.push(url1);

    //   // Push spots to allSpots array
    //   allSpots.push(spots);
      
    //   // Logs for Testing
    // }
    // // Response

    // console.log("const sizes = ", sizes);
    // console.log("const urls = ", urls);
    // console.log("const allSpots = ", allSpots);
    // Temp
    const sizes =  [ [ 1024, 576 ], [ 1024, 576 ], [ 1024, 576 ], [ 1024, 576 ] ]
    const urls =  [
      'https://firebasestorage.googleapis.com/v0/b/spot-41cb1.appspot.com/o/samples%2F1.jpg?alt=media&token=08546a29-aef0-44ba-b3f7-ceda035cfb70',
      'https://firebasestorage.googleapis.com/v0/b/spot-41cb1.appspot.com/o/samples%2F2.jpg?alt=media&token=69b596f0-dead-4bb4-9f4a-bd9e156946b0',
      'https://firebasestorage.googleapis.com/v0/b/spot-41cb1.appspot.com/o/samples%2F3.jpg?alt=media&token=bfe6b695-3bff-4ddd-a1bb-e4431345a84b',
      'https://firebasestorage.googleapis.com/v0/b/spot-41cb1.appspot.com/o/samples%2F4.jpg?alt=media&token=fb67d9b3-a15a-4c2b-8adf-961e0677eacb',
      'https://res.cloudinary.com/dbjuk1r7a/image/upload/v1689683708/processed_samples%252F1.jpg.png',
      'https://res.cloudinary.com/dbjuk1r7a/image/upload/v1689683717/processed_samples%252F2.jpg.png',
      'https://res.cloudinary.com/dbjuk1r7a/image/upload/v1689683727/processed_samples%252F3.jpg.png',
      'https://res.cloudinary.com/dbjuk1r7a/image/upload/v1689683736/processed_samples%252F4.jpg.png'
    ]
    const allSpots =  [
      [
        { x: 398, y: 50, width: 89, height: 64 },
        { x: 913, y: 497, width: 84, height: 79 },
        { x: 259, y: 21, width: 89, height: 78 },
        { x: 303, y: 299, width: 81, height: 73 },
        { x: 150, y: 234, width: 96, height: 77 },
        { x: 736, y: 110, width: 92, height: 60 }
      ],
      [
        { x: 406, y: 424, width: 85, height: 72 },
        { x: 794, y: 183, width: 86, height: 72 },
        { x: 364, y: 140, width: 90, height: 74 },
        { x: 3, y: 515, width: 96, height: 75 },
        { x: 375, y: 71, width: 88, height: 67 },
        { x: 980, y: 155, width: 83, height: 66 }
      ],
      [
        { x: 428, y: 330, width: 91, height: 60 },
        { x: 277, y: 78, width: 88, height: 79 },
        { x: 925, y: 54, width: 89, height: 73 },
        { x: 813, y: 236, width: 99, height: 70 },
        { x: 197, y: 152, width: 88, height: 79 },
        { x: 284, y: 13, width: 80, height: 76 }
      ],
      [
        { x: 476, y: 435, width: 89, height: 63 },
        { x: 237, y: 437, width: 97, height: 70 },
        { x: 645, y: 485, width: 93, height: 68 },
        { x: 202, y: 104, width: 96, height: 66 },
        { x: 413, y: 478, width: 98, height: 71 },
        { x: 685, y: 107, width: 93, height: 70 }
      ]
    ]


    // console.log(urls)
    // console.log(allSpots)
    res.status(200).json({sizes, urls, allSpots });
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

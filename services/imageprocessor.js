const axios = require('axios');
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
const Image = require('../models/image');
const Request = require('../models/request');

exports.processImages = async (images, requestId) => {
  await Request.updateOne({ requestId }, { status: 'PROCESSING' });

  const promises = images.map(async ({ inputUrl, productName }) => {
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
    const outputPath = path.join('uploads/compressed', filename);

    try {
      const response = await axios({ url: inputUrl, responseType: 'arraybuffer' });
      await sharp(response.data)
        .jpeg({ quality: 50 })
        .toFile(outputPath);

      const outputUrl = `/uploads/compressed/${filename}`;

      await Image.create({ requestId, productName, inputUrl, outputUrl });

    } catch (err) {
      console.error(`Failed to process ${inputUrl}:`, err.message);
    }
  });

  await Promise.all(promises);

  await Request.updateOne({ requestId }, { status: 'COMPLETED' });
};

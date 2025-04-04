const fs = require('fs');
const csv = require('csv-parser');

exports.parseCSV = (filePath, requestId) => {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        const urls = row['Input Image Urls'].split(',').map(url => url.trim());
        urls.forEach(url => {
          results.push({ requestId, productName: row['Product Name'], inputUrl: url });
        });
      })
      .on('end', () => resolve(results))
      .on('error', reject);
  });
};

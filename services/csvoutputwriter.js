const fs = require('fs');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

async function generateOutputCSV(requestId, processedData) {
  const OUTPUT_DIR = path.join(__dirname, '../uploads/output');
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const OUTPUT_CSV_PATH = path.join(OUTPUT_DIR, `processed_images_${requestId}.csv`);

  const csvWriter = createCsvWriter({
    path: OUTPUT_CSV_PATH,
    header: [
      { id: 'serialNumber', title: 'S. No.' },
      { id: 'productName', title: 'Product Name' },
      { id: 'inputImageUrls', title: 'Input Image Urls' },
      { id: 'outputImageUrls', title: 'Output Image Urls' },
    ],
  });

  const grouped = {};

  processedData.forEach(item => {
    const key = item.serialNumber;
    if (!grouped[key]) {
      grouped[key] = {
        serialNumber: item.serialNumber,
        productName: item.productName,
        inputImageUrls: [],
        outputImageUrls: [],
      };
    }
    grouped[key].inputImageUrls.push(item.inputUrl);
    grouped[key].outputImageUrls.push(item.outputUrl);
  });

  const records = Object.values(grouped).map(group => ({
    serialNumber: group.serialNumber,
    productName: group.productName,
    inputImageUrls: group.inputImageUrls.join(', '),
    outputImageUrls: group.outputImageUrls.join(', ')
  }));

  await csvWriter.writeRecords(records);
  console.log(`Output CSV saved at: ${OUTPUT_CSV_PATH}`);
}

module.exports = { generateOutputCSV };

const { parseCSV } = require('../services/csvparse');
const { processImages } = require('../services/imageprocessor');
const Request = require('../models/request');
const { v4: uuidv4 } = require('uuid');

exports.uploadCSV = async (req, res) => {
  const requestId = uuidv4();
  const webhookUrl = req.body.webhookUrl || null;

  await Request.create({ requestId, status: 'PENDING', webhookUrl });

  parseCSV(req.file.path, requestId)
    .then(data => processImages(data, requestId))
    .catch(() => Request.updateOne({ requestId }, { status: 'FAILED' }));

  res.json({ requestId });
};

exports.getStatus = async (req, res) => {
  const result = await Request.findOne({ requestId: req.params.requestId });
  if (!result) return res.status(404).send("Not Found");
  res.json({ status: result.status });
};

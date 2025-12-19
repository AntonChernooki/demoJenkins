const mongoose = require('mongoose');


const httpLogSchema = new mongoose.Schema({
  method: String,
  url: String,
  status: Number,
  responseTime: Number,
  timestamp: { type: Date, default: Date.now },
});

const dbLogSchema = new mongoose.Schema({
  operation: String,
  collectionName: String, 
  documentId: String,
  timestamp: { type: Date, default: Date.now },
});

const HttpLog = mongoose.model('HttpLog', httpLogSchema);
const DbLog = mongoose.model('DbLog', dbLogSchema);

module.exports = { HttpLog, DbLog };
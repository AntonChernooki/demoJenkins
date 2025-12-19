
const mongoose = require('mongoose');

const httpLogSchema = new mongoose.Schema({
    method: String,
    url: String,
    status: Number,
    responseTime: Number,
    timestamp: { type: Date, default: Date.now }
});

const dbOperationLogSchema = new mongoose.Schema({
    operation: String,
    collection: String,
    documentId: String,
    timestamp: { type: Date, default: Date.now }
});

const HttpLog = mongoose.model('HttpLog', httpLogSchema);
const DbOperationLog = mongoose.model('DbOperationLog', dbOperationLogSchema);

const connectToMongoDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/logsDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = { connectToMongoDB, HttpLog, DbOperationLog };
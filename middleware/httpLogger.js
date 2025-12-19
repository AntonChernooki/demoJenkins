
const { HttpLog } = require('../models/logModels'); 

const httpLogger = async (req, res, next) => {
  const start = Date.now(); 

 
  res.on('finish', async () => {
    const duration = Date.now() - start; 
    const log = new HttpLog({
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      responseTime: duration,
    });
    await log.save();
    console.log('Log saved:', log);
  });
  
  next(); 
};

module.exports = httpLogger;
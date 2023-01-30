
function logErrors (err, req, res, next) {
    console.log('FUNCTION LOGRRORS');
    console.error(err);
    next(err);
  }
  

  
  function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
      const { output } = err;
      res.status(output.statusCode).json(output.payload);
      res.end()
    }else{
      console.log(`NOT IS BOOM ERROR`)
      next(err);
    }
  }
  
  function errorHandler(err, req, res, next) {
    console.log('FUNCTION ERRORHANDLER');
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }


  module.exports = { logErrors, errorHandler, boomErrorHandler }
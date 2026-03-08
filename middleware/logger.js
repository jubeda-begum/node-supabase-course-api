function logger(req, res, next){
    console.log('S{req.method} ${req.url}');
    next();
}
module.exports = logger;
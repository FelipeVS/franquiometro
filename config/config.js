var environment = process.env.NODE_ENV || 'development';
var user = process.env.DB_USER;
var password = process.env.DB_PWD;

var config = {
  port: normalizePort(process.env.PORT || '3000')
};

if (environment === "production") {
  config.databaseUrl = 'mongodb://' + user + ':' + password + '@ds021741.mlab.com:21741/franquiometro';
} else if (environment === "development") {
  config.databaseUrl = 'mongodb://localhost:27017/franquiometro';
} else if (environment === "test") {
  config.databaseUrl = 'mongodb://localhost:27017/franquiometro-test';
}

// Normalize a port into a number, string, or false.
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}


module.exports = config;

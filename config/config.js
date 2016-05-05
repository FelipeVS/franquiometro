var env = process.env.NODE_ENV || 'development';

var config = {
  port: normalizePort(process.env.PORT || '3000')
};

if (env === "production") {
  config.databaseUrl = 'mongodb://admin:user-admin@ds021741.mlab.com:21741/franquiometro';
} else if (env === "development") {
  config.databaseUrl = 'mongodb://localhost:27017/franquiometro';
} else if (env === "test") {
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

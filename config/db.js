var mongoose = require("mongoose");

module.exports = function(config) {
  mongoose.connect(config.databaseUrl);
  var db = mongoose.connection;

  db.on("error", function() {
    throw new Error("===> Unable to connect to database at " + config.databaseUrl);
  });

  db.on("connected", function() {
  	console.log("===> Mongoose default connection open to " + config.databaseUrl);
  });

  db.on("disconnected", function() {
  	console.log("===> Mongoose default connection disconnected");
  });

  db.once("open", function() {
  	console.log("===> Mongoose default connection is open")
  });

  process.on("SIGINT", function() {
  	db.close(function() {
  		console.log("===> Mongoose default connection disconnected through app termination");
  		process.exit(0);
  	});
  });
};

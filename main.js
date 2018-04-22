;
if (!process.env.token) {
  console.log("Error: Specify token in environment");
  process.exit(1);
}

var receivesFactory = require("./receives/factory.js").ReceivesFactory;
var jobsFactory = require("./jobs/factory.js").JobsFactory;

var botKit = require("./modules/bot_kit.js").BotKit;
botKit.init(receivesFactory, jobsFactory);

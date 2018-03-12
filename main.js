;

if (!process.env.token) {
  console.log("Error: Specify token in environment");
  process.exit(1);
}

var botKit = require("./modules/bot_kit.js").BotKit;
botKit.init();

var receives = require("./receives/receives.js").Receives;
receives.init(botKit);
receives.create();

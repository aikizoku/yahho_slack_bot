;

// SlackのAPItoken取得を確認
if (!process.env.token) {
  console.log("Error: Specify token in environment");
  process.exit(1);
}

/*
* 定数定義
*/
var BOT_NAME = "hima"
var RECEIVED_EVENT_DIRECT_MESSAGE = "direct_message";
var RECEIVED_EVENT_DIRECT_MENTION = "direct_mention";
var RECEIVED_EVENT_MENTION = "mention";
var RECEIVED_EVENT_AMBIENT = "ambient";

/*
* Botkitの初期化
*/
var Botkit = require("botkit");
var controller = Botkit.slackbot({
  debug: true
});
var bot = controller.spawn({
  token: process.env.token
}).startRTM();



/********** ↓Botの実装↓ **********/
createMentionReceive("hello", function(text) {
  return "hello"
});

createMentionReceive("totsuzen", function(text) {
  var textLen = text.length
  var msg = ""
  msg += "_＿人"
  for (var i = 0; i < textLen; i++) {
    msg += "人"
  }
  msg += "人＿\n"
  msg += `_＞　${text}　＜\n`
  msg += "_￣Ｙ"
  for (var i = 0; i < textLen; i++) {
    msg += "Ｙ"
  }
  msg += "Ｙ￣"
  return msg
});
/********** ↑Botの実装↑ **********/



/*
* Modules
*/
function createMentionReceive(method, recieve) {
  var pattern = `${BOT_NAME} ${method}`
  controller.hears(match(pattern), [RECEIVED_EVENT_AMBIENT], function(bot, message) {
    var text = extractText(pattern, message.text)
    bot.reply(message, recieve(text));
  });
}

function match(pattern) {
  return [`(^${pattern}.*)`]
}

function extractText(pattern, messageText) {
  if (messageText.indexOf(pattern)) {
    return ""
  } else {
    return messageText.slice(pattern.length).trim()
  }
}
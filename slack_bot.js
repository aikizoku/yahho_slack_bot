;

// SlackのAPItoken取得を確認
if (!process.env.token) {
  console.log("Error: Specify token in environment");
  process.exit(1);
}

/*
* 定数定義
*/
var BOT_NAME = "hima";
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
createReceive(["yahho", "やっほー", ":yahho:"], function(text) {
  return "やっほー"
});

createMentionReceive(["hello", "あいさつ", "アイサツ", "挨拶"], function(text) {
  return "こんにちは"
});

createMentionReceive(["yahho", "やっほー", "ヤッホー"], function(text) {
  return "やっほー"
});

createMentionReceive(["totsuzen"], function(text) {
  var msg = "";
  msg += "_＿人";
  for (var i = 0; i < text.length; i++) {
    msg += "人";
  }
  msg += "人＿\n";
  msg += `_＞　${text}　＜\n`;
  msg += "_￣Ｙ";
  for (var i = 0; i < text.length; i++) {
    msg += "Ｙ";
  }
  msg += "Ｙ￣";
  return msg
});
/********** ↑Botの実装↑ **********/



/*
* Modules
*/

function createReceive(methods, recieve) {
  controller.hears(methods, [RECEIVED_EVENT_AMBIENT], function(bot, message) {
    bot.reply(message, recieve(message.text));
  });
}

function createMentionReceive(methods, recieve) {
  var patterns = [];
  var regexpsMethods = [];
  for (var i = 0; i < methods.length; i++) {
    var pattern = `${BOT_NAME} ${methods[i]}`;
    patterns.push(pattern);
    regexpsMethods.push(regexp(pattern));
  }
  controller.hears(regexpsMethods, [RECEIVED_EVENT_AMBIENT], function(bot, message) {
    var text = extractText(patterns, message.text);
    bot.reply(message, recieve(text));
  });
}

function regexp(pattern) {
  return `(^${pattern}.*)`
}

function extractText(patterns, messageText) {
  for (var i = 0; i < patterns.length; i++) {
    var pattern = patterns[i];
    if (!messageText.indexOf(pattern)) {
      return messageText.slice(pattern.length).trim()
    }
  }
}
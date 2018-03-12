;
exports.BotKit = {
  BotName: "hima",
  ReceivedEventDirectMessage: "direct_message",
  ReceivedEventDirectMention: "direct_mention",
  ReceivedEventMention: "mention",
  ReceivedEventAmbient: "ambient",
  
  botKit: null,
  controller: null,
  bot: null,
  googleImageSearch: null,

  init: function() {
    this.botKit = require("botkit");
    this.controller = this.botKit.slackbot({
      debug: false
    });
    this.bot = this.controller.spawn({
      token: process.env.token
    }).startRTM();
    this.googleImageSearch = require("node-google-image-search");
  },

  createReceive: function(methods, recieve) {
    this.controller.hears(methods, [this.ReceivedEventAmbient], function(bot, message) {
      recieve(message.text, function(result) {
        this.bot.reply(message, result);
      }.bind(this));
    }.bind(this));
  },

  createMentionReceive: function(methods, recieve) {
    var patterns = [];
    var regexpsMethods = [];
    for (var i = 0; i < methods.length; i++) {
      var pattern = `${this.BotName} ${methods[i]}`;
      patterns.push(pattern);
      regexpsMethods.push(this.regexp(pattern));
    }
    this.controller.hears(regexpsMethods, [this.ReceivedEventAmbient], function(bot, message) {
      var text = this.extractText(patterns, message.text);
      recieve(text, function(result) {
        this.bot.reply(message, result);
      }.bind(this));
    }.bind(this));
  },

  regexp: function (pattern) {
    return `(^${pattern}.*)`
  },

  extractText: function(patterns, messageText) {
    for (var i = 0; i < patterns.length; i++) {
      var pattern = patterns[i];
      if (!messageText.indexOf(pattern)) {
        return messageText.slice(pattern.length).trim()
      }
    }
  },
};

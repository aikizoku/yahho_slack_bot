;
exports.BotKit = {
  botKit: require("botkit"),
  cron: require("cron"),
  googleImageSearch: require("node-google-image-search"),

  BotName: "hima",
  ReceivedEventDirectMessage: "direct_message",
  ReceivedEventDirectMention: "direct_mention",
  ReceivedEventMention: "mention",
  ReceivedEventAmbient: "ambient",
  
  controller: null,
  bot: null,

  init: function(receivesFactory, jobsFactory) {
    this.controller = this.botKit.slackbot({
      debug: false
    });
    this.bot = this.controller.spawn({
      token: process.env.token
    }).startRTM(function(err, bot, payload) {
      if (err) {
        console.error("Error: " + err);
      }
      jobsFactory.init(this.bot);
      var jobs = jobsFactory.generate();
      new this.cron.CronJob({
        cronTime: "0 */1 * * * *",
        onTick: jobs,
        start: true,
        timeZone: "Asia/Tokyo",
      });
    }.bind(this));
    receivesFactory.init(this);
    receivesFactory.generate();
  },

  generateReceive: function(methods, recieve) {
    this.controller.hears(methods, [this.ReceivedEventAmbient], function(bot, message) {
      recieve(message.user, message.text, function(result) {
        this.bot.reply(message, result);
      }.bind(this));
    }.bind(this));
  },

  generateMentionReceive: function(methods, recieve) {
    var patterns = [];
    var regexpsMethods = [];
    for (var i = 0; i < methods.length; i++) {
      var pattern = `${this.BotName} ${methods[i]}`;
      patterns.push(pattern);
      regexpsMethods.push(this.regexp(pattern));
    }
    this.controller.hears(regexpsMethods, [this.ReceivedEventAmbient], function(bot, message) {
      var text = this.extractText(patterns, message.text);
        recieve(message.user, text, function(result) {
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

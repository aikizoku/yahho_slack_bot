;
exports.JobsFactory = {
  jobs: require("./jobs.js").Jobs,

  bot: null,
  botName: null,

  generate: function() {
    var params = this.jobs.params;
    var onTick = function() {
      for (var i = 0; i < params.length; i++) {
        var param = params[i];
        var d = new Date();
        if (d.getHours() == param.hours && d.getMinutes() == param.minutes) {
            this.bot.say({
              channel: param.channel,
              text: param.text,
            });
        }
      }
    }.bind(this);
    return onTick;
  },
};


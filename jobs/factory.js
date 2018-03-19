;
exports.JobsFactory = {
  m: require("moment"),
  jobs: require("./jobs.js").Jobs,

  bot: null,
  botName: null,

  generate: function() {
    var params = this.jobs.params;
    var onTick = function() {
      for (var i = 0; i < params.length; i++) {
        var param = params[i];
        var d = this.m();
        d.utcOffset("+0900");
        var h = Number(d.format("H"));
        var m = Number(d.format("m"));
        if (h == param.hours && m == param.minutes) {
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

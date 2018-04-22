;
exports.JobsFactory = {
  moment: require("moment"),
  jobs: require("./jobs.js").Jobs,

  bot: null,

  init: function(bot) {
    this.bot = bot;
  },

  generate: function() {
    var items = this.jobs.items();
    var onTick = function() {
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var d = this.moment();
        d.utcOffset("+0900");
        var year = Number(d.format("Y"));
        var month = Number(d.format("M"));
        var day = Number(d.format("D"));
        var hour = Number(d.format("H"));
        var minute = Number(d.format("m"));
        var week = Number(d.format("d"));
        if (item.check(year, month, day, hour, minute, week)) {
          item.job(function(text) {
            this.bot.say({
              channel: item.channel,
              text: text,
            });
          }.bind(this));
        }
      }
    }.bind(this);
    return onTick;
  },
};

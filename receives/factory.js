;
exports.ReceivesFactory = {
  receives: require("./receives.js").Receives,

  botKit: null,

  init: function(botKit) {
    this.botKit = botKit;
  },

  generate: function() {
    var items = this.receives.items();
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.type == "all") {
        this.botKit.generateReceive(item.triggers, item.receive);
      } else if (item.type == "mention") {
        this.botKit.generateMentionReceive(item.triggers, item.receive);
      } else {
        console.error("Invalid receive type: " + item.type);
      }
    }
  },
};

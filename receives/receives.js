;
exports.Receives = {
  googleImageSearch: require("node-google-image-search"),
  random: require("./../modules/random.js").Random,
  string: require("./../modules/string.js").String,

  botKit: null,

  GoogleImageSearchCount: 5,

  init: function(botKit) {
    this.botKit = botKit;
  },

  create: function() {
    this.botKit.createReceive(["yahho", "やっほー", ":yahho:"], function(text, completion) {
      completion("やっほー");
    });

    this.botKit.createReceive(["おはよ", "おはおは", "おはまる", "おは:maru:", "おっはー", "おはヨーグルト"], function(text, completion) {
      completion(this.random.randChoice(["おはよー今日もがんばっていこー", "おは:maru:", "おーはー", "おなかすいた", "ねむい"]));
    }.bind(this));

    this.botKit.createReceive(["お疲れ様", ":otsu: :karei:", "おつかれ", "おつおつ"], function(text, completion) {
      completion(this.random.randChoice(["おつかれさまー", "おつおつー", ":otsu::karei:", "おっつおっつー", "おつおつおっつーおっつっつー"]));
    }.bind(this));

    this.botKit.createMentionReceive(["totsuzen"], function(text, completion) {
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
      completion(msg)
    }.bind(this));

    this.botKit.createMentionReceive(["image"], function(text, completion) {
      var results = this.googleImageSearch(text, function(results) {
        var len = results.length;
        var index = this.random.randint(0, len - 1)
        completion(results[index].link);
      }.bind(this), 0, this.GoogleImageSearchCount);
    }.bind(this));

    this.botKit.createMentionReceive(["choice"], function(text, completion) {
      var texts = this.string.replaceHalfSpace(text).split(" ");
      completion(this.random.randChoice(texts));
    }.bind(this));

    this.botKit.createReceive(["ひま", "ヒマ", "暇"], function(text, completion) {
      completion(this.random.randChoice(["僕もひまー", "一緒に遊ぼう"]));
    });
  }
};

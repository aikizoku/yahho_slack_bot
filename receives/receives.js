;
exports.Receives = {
  random: require("./../modules/random.js").Random,
  string: require("./../modules/string.js").String,
  googleImageSearch: require("node-google-image-search"),

  UserAikizoku: "aikizoku",
  UserNinja: "ninja",
  NameAikizoku: "ひろやん",
  NameNinja: "つーちゃん",

  getUserName: function(user) {
    var name = null;
    switch (user) {
      case this.UserAikizoku:
        name = this.NameAikizoku;
        break;
      case this.UserNinja:
        name = this.NameNinja;
        break;
      default:
        name = "";
        break;
    }
    return name
  },

  items: function() { return [
    {
      type: "all",
      triggers: ["yahho", "やっほー", ":yahho:"],
      receive: function(user, text, completion) {
        completion("やっほー");
      },
    },

    {
      type: "all",
      triggers: ["おはよ", "おはおは", "おはまる", "おは:maru:", "おっはー", "おはヨーグルト"],
      receive: function(user, text, completion) {
        var name = this.getUserName(user);
        var texts = [
          "おはよー今日もがんばっていこー",
          "おは:maru:",
          "おーはー",
          "おなかすいた",
          "おはよう、今日も駅にサラリーマンという名の魑魅魍魎が跋扈していたね！",
        ];
        var text = this.random.choice(texts)
        completion(name + "、" + text);
      }.bind(this),
    },

    {
      type: "all",
      triggers: ["お疲れ様", ":otsu: :karei:", "おつかれ", "おつおつ"],
      receive: function(user, text, completion) {
        var texts = [
          "おつかれさまー",
          "おつおつー",
          ":otsu::karei:",
          "おぅつぅ",
        ];
        completion(this.random.choice(texts));
      }.bind(this),
    },

    {
      type: "mention",
      triggers: ["totsuzen"],
      receive: function(user, text, completion) {
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
        completion(msg);
      },
    },

    {
      type: "mention",
      triggers: ["image"],
      receive: function(user, text, completion) {
        var results = this.googleImageSearch(text, function(results) {
          var len = results.length;
          var index = this.random.int(0, len - 1)
          completion(results[index].link);
        }.bind(this), 0, 8);
      }.bind(this),
    },

    {
      type: "mention",
      triggers: ["choice"],
      receive: function(user, text, completion) {
        var texts = this.string.replaceHalfSpace(text).split(" ");
        completion(this.random.choice(texts));
      }.bind(this),
    },

    {
      type: "all",
      triggers: ["ひま", "ヒマ", "暇"],
      receive: function(user, text, completion) {
        var texts = [
          "僕もひまー",
          "一緒に遊ぼう",
        ];
        completion(this.random.choice(texts));
      }.bind(this),
    },
  ]},
};

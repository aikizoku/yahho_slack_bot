;

// メモ
// 0:日 1:月 2:火 3:水 4:木 5:金 6:土

exports.Jobs = {
  random: require("./../modules/random.js").Random,
  string: require("./../modules/string.js").String,

  items: function() { return [
    {
      channel: "chatting",
      check: function(year, month, day, hour, minute, week) {
        // 平日の18時30分
        if (1 <= week && week <= 5) {
          if (hour == 18 && minute == 30) {
            return true;
          }
        }
        return false;
      },
      job: function(completion) {
        var texts = [
          "定時だよ！今日もおつかれさまっ！",
          "定時だーかえろーかえろー",
          "お仕事おつかれさまですーお家へかえろー！",
          "ていじだよーしごとをやめてーおうちへかえろー",
          "さぁ、今日も気合を入れて帰ろー！"
        ];
        completion(this.random.choice(texts));
      }.bind(this),
    },

    {
      channel: "ikekatsu_dialy",
      check: function(year, month, day, hour, minute, week) {
        // 平日の17時
        if (1 <= week && week <= 5) {
          if (hour == 17 && minute == 0) {
            return true;
          }
        }
        return false;
      },
      job: function(completion) {
        completion("今日のイケ活を書く時間だよー！");
      },
    },

    {
      channel: "chatting",
      check: function(year, month, day, hour, minute, week) {
        // 平日の9時30分〜18時30分
        if (1 <= week && week <= 5) {
          var time = (hour * 100) + minute
          if (930 <= time && time <= 1830) {
            return this.random.bool(0.5);
          }
        }
        return false;
      }.bind(this),
      job: function(completion) {
        completion("くしゅん");
      },
    },
  ]},
};
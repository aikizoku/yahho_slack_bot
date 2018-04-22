;
exports.Random = {
  seed: Date.now(),
  seedMax: 4294967295,

  r: function() {
    var seed = this.seed;
    seed = seed ^ (seed << 13);
    seed = seed ^ (seed >>> 17);
    seed = (seed ^ (seed << 5));
    this.seed = seed;
    return (seed >>> 0) / this.seedMax;
  },

  int: function(min, max) {
    return Math.floor(this.r()*(max-min+1)) + min;
  },

  float: function(min, max) {
    return this.r()*(max-min)+min;
  },
  
  bool: function(perecent) {
    return this.float(0, 100) < (perecent || 50);
  },
  
  array: function(len, min, max) {
    len = len || 100;
    min = min || 0;
    max = max || 100;
    return (len).map(function() {
      return this.int(min, max);
    }, this);
  },

  choice: function(array) {
    if (array.length == 0) { return null }
    return array[this.int(0, array.length - 1)];
  }
}
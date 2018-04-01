;
exports.Random = {
  seed: Date.now(),
  seedMax: 4294967295,

  random: function() {
    var seed = this.seed;
    seed = seed ^ (seed << 13);
    seed = seed ^ (seed >>> 17);
    seed = (seed ^ (seed << 5));
    this.seed = seed;
    return (seed >>> 0) / this.seedMax;
  },

  randint: function(min, max) {
    return Math.floor( this.random()*(max-min+1) ) + min;
  },

  randfloat: function(min, max) {
    return this.random()*(max-min)+min;
  },
  
  randbool: function() {
    return this.randint(0, 1) === 1;
  },
  
  randarray: function(len, min, max) {
    len = len || 100;
    min = min || 0;
    max = max || 100;
    return (len).map(function() {
      return this.randint(min, max);
    }, this);
  },

  randChoice: function(array) {
    if (array.length == 0) { return null }
    return array[this.randint(0, array.length - 1)];
  }
}
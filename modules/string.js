;
exports.String = {

  replaceAll: function(source, target, replace) {
    var reg = new RegExp(target, "g");
    return source.replace(reg, replace);
  },

  replaceHalfSpace: function(source) {
    return this.replaceAll(source, "　", " ");
  },
}
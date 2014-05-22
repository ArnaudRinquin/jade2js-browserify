var html2js = require('html2js-browserify');
var jade = require('jade');

var locals = {}

html2js.configure({
  preprocessors:[
    {
      matches: function(file) {
        return /\.jade$/.test(file);
      },
      process: function(content){
        return jade.compile(content)(locals);
      }
    }
  ]
});

html2js.setLocals = function(_locals){
  locals = _locals;
}

module.exports = html2js;


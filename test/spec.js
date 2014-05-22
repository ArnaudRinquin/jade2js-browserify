var browserify = require('browserify');
var fs = require('fs');
var jade2js = require('..');
require('chai').should();

describe('jade2js-browserify', function () {
  beforeEach(function (done) {
    fs.writeFile(__dirname + '/testFile.js', "var html = require('./testFile.jade');result(html);", function (error) {
      if (error) done(error);

      fs.writeFile(__dirname + '/testFile.jade', "h1 Helloworld", function (error) {
        if (error) done(error);

        done();
      });
    });
  });

  afterEach(function (done) {
    fs.unlink(__dirname + '/testFile.js', function () {
      fs.unlink(__dirname + '/testFile.jade', function () {
        done();
      });
    });
  });

  it('converts jade into js', function (done) {
    var b = browserify(__dirname + '/testFile.js');
    b.transform(jade2js);
    b.bundle({}, function (error, bundle) {
      if (error) {
        done(error);
      } else {
        function result(html) {
          html.should.equal("<h1>Helloworld</h1>");
          done();
        }
        var f = eval(bundle);
      }
    });
  });
});

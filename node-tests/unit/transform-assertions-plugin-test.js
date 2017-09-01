var assert = require('assert');
var fs = require('fs');
var babel = require('babel-core');
var TransformAssertions = require('../../lib/transform-assertions-plugin');

function transform(code, options) {
  return babel.transform(code, {
    plugins: [TransformAssertions(options)]
  }).code;
}

function assertOutput(fileName, addFile) {
  fileName = fileName + '.js';
  var source = fs.readFileSync('./node-tests/fixtures/original/unit/' + fileName, 'utf8');
  var transformed = fs.readFileSync('./node-tests/fixtures/transformed/unit/' + fileName, 'utf8');
  var options = addFile ? { file: fileName } : {};

  var transformedSource = transform(source, options);
  var expectedSource = babel.transform(transformed).code;

  assert.equal(transformedSource, expectedSource);
}

describe('transform qunit assertions', function() {
  it('transforms ok assertions', function() {
    assertOutput('ok');
  });

  it('transforms notOk assertions', function() {
    assertOutput('not-ok');
  });

  it('transforms equal assertions', function() {
    assertOutput('equal');
  });

  it('transforms not-equal assertions', function() {
    assertOutput('not-equal');
  });

  //it('adds file path and line number of assertion based on options', function() {
    //assertOutput('with-file-line', true);
  //});

  it('transforms deep-equal assertions', function() {
    assertOutput('deep-equal');
  });

  it('transforms not-deep-equal assertions', function() {
    assertOutput('not-deep-equal');
  });

  it('transforms prop-equal assertions', function() {
    assertOutput('prop-equal');
  });

  it('transforms not-prop-equal assertions', function() {
    assertOutput('not-prop-equal');
  });

  it('transforms strict-equal assertions', function() {
    assertOutput('strict-equal');
  });

  it('transforms not-strict-equal assertions', function() {
    assertOutput('not-strict-equal');
  });
});

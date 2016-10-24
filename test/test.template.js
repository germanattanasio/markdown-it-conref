/* global it, describe */
'use strict';

var assert = require('assert');
var markdownIt = require('markdown-it');
var conref = require('../index');

describe('markdown-it-conref', function() {
  it('should replace variables from a given object', function() {
    assert.equal('<p>hello Bruce Wayne</p>\n', markdownIt()
      .use(conref, { data : { site: { batman: 'Bruce Wayne' } } } )
      .render('hello {{  site.batman}}')
    )

    assert.equal('<p>hello Bruce Wayne</p>\n', markdownIt()
      .use(conref, { data : { site: { batman: 'Bruce Wayne' } } } )
      .render('hello {{site.batman  }}')
    )

    assert.equal('<p>hello Bruce Wayne</p>\n', markdownIt()
      .use(conref, { data : { site: { batman: 'Bruce Wayne' } } } )
      .render('hello {{ site.batman }}')
    )
  });

  it('should replace variables from a given yml file', function() {
    assert.equal('<p>hello Bruce Wayne</p>\n', markdownIt()
      .use(conref, { file : __dirname + '/data.yml' })
      .render('hello {{site.batman}}')
    )
  });

  it('should ignore variables without replacement', function() {
    assert.equal('<p>hello {{site.robin}}</p>\n', markdownIt()
      .use(conref, { data : { } })
      .render('hello {{site.robin}}')
    )
  });

  it('should ignore empty variables', function() {
    assert.equal('<p>hello {{}}</p>\n', markdownIt()
      .use(conref, { data : { } })
      .render('hello {{}}')
    )
  });

  it('should throw error if data and file are null', function() {
    assert.throws(function() {
      markdownIt()
      .use(conref)
      .render('hello {{site.robin}}')
    }, Error, 'file and data cannot be null');
  });

  it('should replace all the variables', function() {
    assert.equal('<p>}} hello Bruce Wayne ! Bar ? Foo {{ {{</p>\n', markdownIt()
      .use(conref, { file : __dirname + '/data.yml' })
      .render('}} hello {{site.batman}} ! {{site.bar}} ? {{site.foo}} {{ {{')
    )
  });
});

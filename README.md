# markdown-it-conref [![Build Status](https://travis-ci.org/germanattanasio/markdown-it-conref.svg?branch=master)](http://travis-ci.org/germanattanasio/markdown-it-conref)
Adds the ability to use DITA Content References —or conrefs— as a `markdown-it` plugin.

## Install

```
$ npm install --save markdown-it-conref
```


## Usage

#### Using variables from an object

```js

var md = require('markdown-it');
var conref = require('markdown-it-conref');

var options = {
  data: {
    site: {
      batman: 'Bruce Wayne'
    }
  }
};

md.use(conref, options);

console.log(md.render('hello {{site.batman}}'));

// Output
// '<p>hello Bruce Wayne</p>\n'
```

#### Using variables from a  `json` or `yml` file

```js
var md = require('markdown-it');
var conref = require('markdown-it-conref');

var options = {
  file: __dirname + '/test/data.yml'
}

md.use(conref, options);

console.log(md.render('hello {{site.batman}}'));

// Output
// '<p>hello Bruce Wayne</p>\n'
```
yaml:
```yml
site:
  batman: 'Bruce Wayne'
  foo: 'Foo'
  bar: 'Bar'
```

## Demo
[JsFiddle](https://jsfiddle.net/germanattanasio/236qqvpt/)


## License
  MIT

'use strict';

var plugin = require('markdown-it-regexp');
var YAML = require('yamljs');

/**
 * Gets the value at <code>path</code> of <code>object</code>.
 * If the resolved value is undefined, the defaultValue is returned in its place.
 * @param  {String} path The json path to the value to extract
 * @param  {[type]} object  The object where the value is
 * @param  {[String]} defaultValue  The default value
 * @return {[String]}      The value
 */
var resolve = function(path, object, defaultValue) {
  if (!path || !object)
    return defaultValue;
  return path.split('.').reduce(function(prev, curr) {
    return prev ? prev[curr] : undefined
  }, object) || defaultValue;
}

/**
 * Wrap the markdown-it-regexp plugin with the data from the file.
 * @param {Object} md      The markdown-it object
 * @param {Object} options The plugin options.
 * @param {Object} [options.file] The file with the data to replace
 * @param {Object} [options.data] The data to replace
 * @return {Function} The callback function
 */
var wrapper = function Wrapper(md, options) {
  return plugin(/{{([\w\.]*?)}}/, function Maching(match, utils) {
    return utils.escape(resolve(match[1], options.data, match[0]));
  })(md, options);
}

/**
 * Instantiate the plugin from a file or given object.
 * @param {Object} md      The markdown-it object
 * @param {Object} options The plugin options.
 * @param {Object} [options.file] The file with the data to replace
 * @param {Object} [options.data] The data to replace
 * @return {Function} The markdown-it plugin
 */
module.exports = function (md, options) {
  if (options && options.file) {
    options.data = YAML.load(options.file);
  }
  if (!options || !options.data) {
    throw new Error('file or data need to be specified.');
  }

  return wrapper(md, options);
};

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('mithril')) :
  typeof define === 'function' && define.amd ? define('mithril-bootstrap', ['mithril'], factory) :
  (global.mbs = factory(global.m));
}(this, (function (m) { 'use strict';

m = 'default' in m ? m['default'] : m;

// based on https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
var merge = function (target, concatKeys) {
  var args = [], len = arguments.length - 2;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 2 ];

  if (target == null) {
    throw new TypeError('Cannot convert null or undefined to object')
  }
  var concatKeys = [].concat(concatKeys);
  var result = Object(target);

  for (var index = 1; index < args.length; ++index) {
    var next = args[index];

    if (next != null) {
      for (var key in next) {
        if (Object.prototype.hasOwnProperty.call(next, key)) {
          if (concatKeys.indexOf(key) != -1) {
            result[key] = result[key] ? result[key].concat(next[key]) : next[key];
          } else {
            result[key] = next[key];
          }
        }
      }
    }
  }
  return result
};

var alert = function (content, attrs) { return m('', merge({ class : 'alert' }, 'class', attrs), content); };

var success = function (content, attrs) { return alert(content, merge({ class : 'alert alert-success' }, 'class', attrs)); };
var info    = function (content, attrs) { return alert(content, merge({ class : 'alert alert-info'    }, 'class', attrs)); };
var warning = function (content, attrs) { return alert(content, merge({ class : 'alert alert-warning' }, 'class', attrs)); };
var danger  = function (content, attrs) { return alert(content, merge({ class : 'alert alert-danger'  }, 'class', attrs)); };

var alert$1 = {
  success: success, info: info, warning: warning, danger: danger
};

var index = {
  alert: alert$1
};

return index;

})));

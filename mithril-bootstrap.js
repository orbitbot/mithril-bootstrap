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

  for (var index = 0; index < args.length; ++index) {
    var next = args[index];

    if (next != null) {
      for (var key in next) {
        if (Object.prototype.hasOwnProperty.call(next, key)) {
          if (concatKeys.indexOf(key) != -1 && typeof result[key] === 'string') {
            result[key] = result[key] ? ((result[key]) + " " + (next[key])) : next[key];
          } else {
            result[key] = next[key];
          }
        }
      }
    }
  }
  return result
};

var alert       = function (content, attrs) { return m('', merge({ class : 'alert' }, 'class', attrs), content); };
var dismissible = function (content, attrs) { return m('', merge({ class : 'alert alert-dismissible' }, 'class', attrs), [m('button.close[type="button"]', { onclick : attrs.dismissClick || '' }, m.trust('&times;'))].concat(content)); };

var alert$1 = {
  success : function (content, attrs) { return alert(content, merge({ class : 'alert-success' }, 'class', attrs)); },
  info    : function (content, attrs) { return alert(content, merge({ class : 'alert-info'    }, 'class', attrs)); },
  warning : function (content, attrs) { return alert(content, merge({ class : 'alert-warning' }, 'class', attrs)); },
  danger  : function (content, attrs) { return alert(content, merge({ class : 'alert-danger'  }, 'class', attrs)); },
  dismissible : {
    success : function (content, attrs) { return dismissible(content, merge({ class : 'alert-success' }, 'class', attrs)); },
    info    : function (content, attrs) { return dismissible(content, merge({ class : 'alert-info'    }, 'class', attrs)); },
    warning : function (content, attrs) { return dismissible(content, merge({ class : 'alert-warning' }, 'class', attrs)); },
    danger  : function (content, attrs) { return dismissible(content, merge({ class : 'alert-danger'  }, 'class', attrs)); },
  }
};

var index = {
  alert: alert$1
};

return index;

})));

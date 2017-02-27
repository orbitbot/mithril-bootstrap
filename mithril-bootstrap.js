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

// for onbeforeremove and CSS transitions
var delay = function (duration) { return new Promise(function (resolve) { return setTimeout(resolve, duration); }); };

var alert = function (defaultClasses) { return ({

  oncreate : function (ref) {
    var dom = ref.dom;

    if (/\bfade\b/.test(dom.className))
      { setTimeout(function () { dom.className = dom.className.replace('fade', 'fade.show'); }, 16); }
  },

  onbeforeremove : function (ref) {
    var dom = ref.dom;

    if (/\bfade.show\b/.test(dom.className)) {
      dom.classList.value.replace('fade.show', 'fade');
      return delay(150)
    }
  },

  view : function (ref) {
    var attrs = ref.attrs;
    var children = ref.children;

    return m('', merge({ class: defaultClasses }, 'class', attrs), [
                                    m('button.close[type="button"]', { onclick : attrs.dismissClick || '' }, m.trust('&times;'))
                                  ].concat(children));
  }
}); };

var alert$1 = {
  success : alert('alert alert-success'),
  info    : alert('alert alert-info'),
  warning : alert('alert alert-warning'),
  danger  : alert('alert alert-danger'),
  dismissible : {
    success : alert('alert alert-dismissable alert-success'),
    info    : alert('alert alert-dismissable alert-info'),
    warning : alert('alert alert-dismissable alert-warning'),
    danger  : alert('alert alert-dismissable alert-danger'),
  }
};

var index = {
  alert: alert$1
};

return index;

})));

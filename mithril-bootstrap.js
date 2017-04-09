(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('mithril')) :
	typeof define === 'function' && define.amd ? define('mithril-bootstrap', ['mithril'], factory) :
	(global.mbs = factory(global.m));
}(this, (function (m) { 'use strict';

m = 'default' in m ? m['default'] : m;

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var stream$2 = createCommonjsModule(function (module) {
"use strict";

var guid = 0, HALT = {};
function createStream() {
	function stream() {
		if (arguments.length > 0 && arguments[0] !== HALT) { updateStream(stream, arguments[0]); }
		return stream._state.value
	}
	initStream(stream);

	if (arguments.length > 0 && arguments[0] !== HALT) { updateStream(stream, arguments[0]); }

	return stream
}
function initStream(stream) {
	stream.constructor = createStream;
	stream._state = {id: guid++, value: undefined, state: 0, derive: undefined, recover: undefined, deps: {}, parents: [], endStream: undefined};
	stream.map = stream["fantasy-land/map"] = map, stream["fantasy-land/ap"] = ap, stream["fantasy-land/of"] = createStream;
	stream.valueOf = valueOf, stream.toJSON = toJSON, stream.toString = valueOf;

	Object.defineProperties(stream, {
		end: {get: function() {
			if (!stream._state.endStream) {
				var endStream = createStream();
				endStream.map(function(value) {
					if (value === true) { unregisterStream(stream), unregisterStream(endStream); }
					return value
				});
				stream._state.endStream = endStream;
			}
			return stream._state.endStream
		}}
	});
}
function updateStream(stream, value) {
	updateState(stream, value);
	for (var id in stream._state.deps) { updateDependency(stream._state.deps[id], false); }
	finalize(stream);
}
function updateState(stream, value) {
	stream._state.value = value;
	stream._state.changed = true;
	if (stream._state.state !== 2) { stream._state.state = 1; }
}
function updateDependency(stream, mustSync) {
	var state = stream._state, parents = state.parents;
	if (parents.length > 0 && parents.every(active) && (mustSync || parents.some(changed))) {
		var value = stream._state.derive();
		if (value === HALT) { return false }
		updateState(stream, value);
	}
}
function finalize(stream) {
	stream._state.changed = false;
	for (var id in stream._state.deps) { stream._state.deps[id]._state.changed = false; }
}

function combine(fn, streams) {
	if (!streams.every(valid)) { throw new Error("Ensure that each item passed to m.prop.combine/m.prop.merge is a stream") }
	return initDependency(createStream(), streams, function() {
		return fn.apply(this, streams.concat([streams.filter(changed)]))
	})
}

function initDependency(dep, streams, derive) {
	var state = dep._state;
	state.derive = derive;
	state.parents = streams.filter(notEnded);

	registerDependency(dep, state.parents);
	updateDependency(dep, true);

	return dep
}
function registerDependency(stream, parents) {
	for (var i = 0; i < parents.length; i++) {
		parents[i]._state.deps[stream._state.id] = stream;
		registerDependency(stream, parents[i]._state.parents);
	}
}
function unregisterStream(stream) {
	for (var i = 0; i < stream._state.parents.length; i++) {
		var parent = stream._state.parents[i];
		delete parent._state.deps[stream._state.id];
	}
	for (var id in stream._state.deps) {
		var dependent = stream._state.deps[id];
		var index = dependent._state.parents.indexOf(stream);
		if (index > -1) { dependent._state.parents.splice(index, 1); }
	}
	stream._state.state = 2; //ended
	stream._state.deps = {};
}

function map(fn) {return combine(function(stream) {return fn(stream())}, [this])}
function ap(stream) {return combine(function(s1, s2) {return s1()(s2())}, [stream, this])}
function valueOf() {return this._state.value}
function toJSON() {return this._state.value != null && typeof this._state.value.toJSON === "function" ? this._state.value.toJSON() : this._state.value}

function valid(stream) {return stream._state }
function active(stream) {return stream._state.state === 1}
function changed(stream) {return stream._state.changed}
function notEnded(stream) {return stream._state.state !== 2}

function merge(streams) {
	return combine(function() {
		return streams.map(function(s) {return s()})
	}, streams)
}
createStream["fantasy-land/of"] = createStream;
createStream.merge = merge;
createStream.combine = combine;
createStream.HALT = HALT;

{ module["exports"] = createStream; }
});

var stream = stream$2;

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

var component = {

  oncreate : function (ref) {
    var dom = ref.dom;

    document.body.className = document.body.className + ' modal-open';
    if (/\bfade\b/.test(dom.className)) {
      var temp = dom.offsetHeight; // force browser to redraw, need to store value for effect
      dom.className = dom.className.replace('fade', 'fade in');
    }
  },

  onbeforeremove : function (ref) {
    var dom = ref.dom;

    document.body.className = document.body.className.replace(' modal-open', '');
    if (/\bfade in\b/.test(dom.className)) {
      dom.className = dom.className.replace('fade in', 'fade');
      return delay(150)
    }
  },

  view : function (ref) {
    var attrs = ref.attrs;

    return [
    m('.modal.show', merge({ role : 'dialog', tabindex : -1 }, 'class', attrs),
      m('.modal-dialog[role="document"]',
        m('.modal-content', [
          attrs.header && m('.modal-header', attrs.header),
          attrs.body   && m('.modal-body',   attrs.body),
          attrs.footer && m('.modal-footer', attrs.footer)
        ])
      )
    ),
    attrs.backdrop !== false && m('.modal-backdrop.in', { onclick : (attrs.backdrop !== 'static' ? attrs.dismiss : '') } )
  ];
}
};

var Api = function () {

  var show = stream();
  var dismiss = function () { return show(undefined); };
  show.map(m.redraw);

  return { show: show, dismiss: dismiss, view: function () { return show() && m(component, merge({ dismiss: dismiss }, [], show())); } }
};

var modal = Api();

var index = {
  modal: modal
};

return index;

})));

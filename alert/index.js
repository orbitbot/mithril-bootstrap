import m from 'mithril'
import { merge } from '/utils'

const alert       = (content, attrs) => m('', merge({ class : 'alert' }, 'class', attrs), content)
const dismissible = (content, attrs) => m('', merge({ class : 'alert alert-dismissible' }, 'class', attrs), [m('button.close[type="button"]', { onclick : attrs.dismissClick || '' }, m.trust('&times;'))].concat(content))

export default {
  success : (content, attrs) => alert(content, merge({ class : 'alert-success' }, 'class', attrs)),
  info    : (content, attrs) => alert(content, merge({ class : 'alert-info'    }, 'class', attrs)),
  warning : (content, attrs) => alert(content, merge({ class : 'alert-warning' }, 'class', attrs)),
  danger  : (content, attrs) => alert(content, merge({ class : 'alert-danger'  }, 'class', attrs)),
  dismissible : {
    success : (content, attrs) => dismissible(content, merge({ class : 'alert-success' }, 'class', attrs)),
    info    : (content, attrs) => dismissible(content, merge({ class : 'alert-info'    }, 'class', attrs)),
    warning : (content, attrs) => dismissible(content, merge({ class : 'alert-warning' }, 'class', attrs)),
    danger  : (content, attrs) => dismissible(content, merge({ class : 'alert-danger'  }, 'class', attrs)),
  }
}

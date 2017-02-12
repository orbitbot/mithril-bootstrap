import m from 'mithril'
import { merge } from '/utils'

const alert = (content, attrs) => m('', merge({ class : 'alert' }, 'class', attrs), content)

const dismissible = (content, attrs) =>  m('', { class : 'alert-dismissible' }, [m('button.close', { type : 'button '}, m.trust('&times;'))].concat(content))

const success = (content, attrs) => alert(content, merge({ class : 'alert alert-success' }, 'class', attrs))
const info    = (content, attrs) => alert(content, merge({ class : 'alert alert-info'    }, 'class', attrs))
const warning = (content, attrs) => alert(content, merge({ class : 'alert alert-warning' }, 'class', attrs))
const danger  = (content, attrs) => alert(content, merge({ class : 'alert alert-danger'  }, 'class', attrs))

export default {
  success, info, warning, danger
}

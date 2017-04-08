import m from 'mithril'
import { merge, delay } from '/utils'


const alert = (defaultClasses) => ({

  oncreate : ({ dom }) => {
    if (/\bfade\b/.test(dom.className)) {
      var temp = dom.offsetHeight // force browser to redraw, need to store value for effect
      dom.className = dom.className.replace('fade', 'fade in')
    }
  },

  onbeforeremove : ({ dom }) => {
    if (/\bfade in\b/.test(dom.className)) {
      dom.className = dom.className.replace('fade in', 'fade')
      return delay(150)
    }
  },

  view : ({ attrs, children }) => m('', merge({ class: defaultClasses }, 'class', attrs), [
                                    m('button.close[type="button"]', { onclick : attrs.dismissClick || '' }, m.trust('&times;'))
                                  ].concat(children))
})

export default {
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
}

import m from 'mithril'
import { merge, delay } from '/utils'


const alert = (defaultClasses) => ({

  oncreate : ({ dom }) => {
    if (/\bfade\b/.test(dom.className))
      setTimeout(() => { dom.className = dom.className.replace('fade', 'fade.show') }, 16)
  },

  onbeforeremove : ({ dom }) => {
    if (/\bfade.show\b/.test(dom.className)) {
      dom.classList.value.replace('fade.show', 'fade')
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

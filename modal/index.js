import m from 'mithril'
import stream from 'mithril/stream'
import { merge, delay } from '/utils'


export const component = {

  oncreate : ({ dom }) => {
    document.body.className = document.body.className + ' modal-open'
    if (/\bfade\b/.test(dom.className)) {
      var temp = dom.offsetHeight // force browser to redraw, need to store value for effect
      dom.className = dom.className.replace('fade', 'fade in')
    }
  },

  onbeforeremove : ({ dom }) => {
    document.body.className = document.body.className.replace(' modal-open', '')
    if (/\bfade in\b/.test(dom.className)) {
      dom.className = dom.className.replace('fade in', 'fade')
      return delay(150)
    }
  },

  view : ({ attrs }) => [
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
  ]
}

const Api = () => {

  const show = stream()
  const dismiss = () => show(undefined)
  show.map(m.redraw)

  return { show, dismiss, view: () => show() && m(component, merge({ dismiss }, [], show())) }
}

export default Api()

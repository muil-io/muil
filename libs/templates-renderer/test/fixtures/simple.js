/*! For license information please see simple.js.LICENSE.txt */
(() => {
  'use strict';
  var e = {
      197(e, r) {
        var t = Symbol.for('react.transitional.element');
        function o(e, r, o) {
          var a = null;
          if ((void 0 !== o && (a = '' + o), void 0 !== r.key && (a = '' + r.key), 'key' in r))
            for (var l in ((o = {}), r)) 'key' !== l && (o[l] = r[l]);
          else o = r;
          return (
            (r = o.ref), { $$typeof: t, type: e, key: a, ref: void 0 !== r ? r : null, props: o }
          );
        }
        Symbol.for('react.fragment'), (r.jsx = o), (r.jsxs = o);
      },
      85(e, r, t) {
        e.exports = t(197);
      },
    },
    r = {};
  function t(o) {
    var a = r[o];
    if (void 0 !== a) return a.exports;
    var l = (r[o] = { exports: {} });
    return e[o](l, l.exports, t), l.exports;
  }
  (t.d = (e, r) => {
    for (var o in r)
      t.o(r, o) && !t.o(e, o) && Object.defineProperty(e, o, { enumerable: !0, get: r[o] });
  }),
    (t.o = (e, r) => Object.prototype.hasOwnProperty.call(e, r)),
    (t.r = (e) => {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    });
  var o = {};
  t.r(o), t.d(o, { default: () => n }), require('react');
  var a = t(85),
    l = function (e) {
      var r = e.name,
        t = e.callToActionUrl;
      return (0, a.jsx)('div', {
        className: 'root',
        children: (0, a.jsxs)('div', {
          className: 'content',
          children: [
            (0, a.jsx)('p', { className: 'text', children: 'Hi '.concat(r, ',') }),
            (0, a.jsx)('p', {
              className: 'text',
              children:
                'Sometimes you just need a simple HTML email with a simple design and clear call to action. This is it.',
            }),
            (0, a.jsx)('a', {
              href: t,
              target: '_blank',
              rel: 'noopener noreferrer',
              className: 'button',
              children: 'Call to Action',
            }),
            (0, a.jsx)('p', { className: 'text', children: 'Good luck!' }),
          ],
        }),
      });
    };
  (l.displayName = 'Simple Template'),
    (l.dynamicProps = { name: 'John', callToActionUrl: 'https://www.muil.io' });
  const n = l;
  module.exports = o;
})();

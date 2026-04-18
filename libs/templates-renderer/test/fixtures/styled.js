/*! For license information please see styled.js.LICENSE.txt */
(() => {
  'use strict';
  var e = {
      197(e, n) {
        var r = Symbol.for('react.transitional.element');
        function t(e, n, t) {
          var o = null;
          if ((void 0 !== t && (o = '' + t), void 0 !== n.key && (o = '' + n.key), 'key' in n))
            for (var a in ((t = {}), n)) 'key' !== a && (t[a] = n[a]);
          else t = n;
          return (
            (n = t.ref), { $$typeof: r, type: e, key: o, ref: void 0 !== n ? n : null, props: t }
          );
        }
        Symbol.for('react.fragment'), (n.jsx = t), (n.jsxs = t);
      },
      85(e, n, r) {
        e.exports = r(197);
      },
    },
    n = {};
  function r(t) {
    var o = n[t];
    if (void 0 !== o) return o.exports;
    var a = (n[t] = { exports: {} });
    return e[t](a, a.exports, r), a.exports;
  }
  (r.n = (e) => {
    var n = e && e.__esModule ? () => e.default : () => e;
    return r.d(n, { a: n }), n;
  }),
    (r.d = (e, n) => {
      for (var t in n)
        r.o(n, t) && !r.o(e, t) && Object.defineProperty(e, t, { enumerable: !0, get: n[t] });
    }),
    (r.o = (e, n) => Object.prototype.hasOwnProperty.call(e, n)),
    (r.r = (e) => {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    });
  var t = {};
  r.r(t), r.d(t, { default: () => h }), require('react');
  const o = require('styled-components');
  var a,
    i,
    d,
    l,
    s,
    p = r.n(o),
    c = r(85);
  function f(e, n) {
    return (
      n || (n = e.slice(0)),
      Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(n) } }))
    );
  }
  var u = p().div(
      a ||
        (a = f([
          '\n  background: white;\n  font-family: sans-serif;\n  font-size: 16px;\n  color: #424242;\n  padding: 40px 30px;\n',
        ])),
    ),
    x = p().div(
      i ||
        (i = f([
          '\n  max-width: 480px;\n  margin: 0 auto;\n  padding: 32px;\n  border-radius: 8px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);\n',
        ])),
    ),
    y = p().h1(
      d || (d = f(['\n  margin: 0 0 16px 0;\n  font-size: 28px;\n  font-weight: 700;\n'])),
    ),
    m = p().p(l || (l = f(['\n  margin: 0 0 24px 0;\n  line-height: 1.5;\n  opacity: 0.92;\n']))),
    b = p().a(
      s ||
        (s = f([
          '\n  display: inline-block;\n  padding: 12px 28px;\n  background: white;\n  color: #764ba2;\n  border-radius: 6px;\n  font-weight: 600;\n  text-decoration: none;\n',
        ])),
    ),
    g = function (e) {
      var n = e.name,
        r = e.ctaUrl;
      return (0, c.jsx)(u, {
        children: (0, c.jsxs)(x, {
          children: [
            (0, c.jsxs)(y, { children: ['Hi ', n, ' 👋'] }),
            (0, c.jsx)(m, {
              children:
                'This template is styled with styled-components — CSS-in-JS with a dynamic theme-friendly API.',
            }),
            (0, c.jsx)(b, {
              href: r,
              target: '_blank',
              rel: 'noopener noreferrer',
              children: 'Learn more →',
            }),
          ],
        }),
      });
    };
  (g.displayName = 'Styled Components Template'),
    (g.dynamicProps = { name: 'Jane', ctaUrl: 'https://styled-components.com' });
  const h = g;
  module.exports = t;
})();

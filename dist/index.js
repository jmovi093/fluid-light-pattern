import Me, { useRef as k, useEffect as $e, useState as vr, useMemo as mr } from "react";
var de = { exports: {} }, q = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ie;
function yr() {
  if (Ie) return q;
  Ie = 1;
  var x = Me, l = Symbol.for("react.element"), c = Symbol.for("react.fragment"), E = Object.prototype.hasOwnProperty, A = x.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, D = { key: !0, ref: !0, __self: !0, __source: !0 };
  function g(p, t, T) {
    var b, o = {}, S = null, I = null;
    T !== void 0 && (S = "" + T), t.key !== void 0 && (S = "" + t.key), t.ref !== void 0 && (I = t.ref);
    for (b in t) E.call(t, b) && !D.hasOwnProperty(b) && (o[b] = t[b]);
    if (p && p.defaultProps) for (b in t = p.defaultProps, t) o[b] === void 0 && (o[b] = t[b]);
    return { $$typeof: l, type: p, key: S, ref: I, props: o, _owner: A.current };
  }
  return q.Fragment = c, q.jsx = g, q.jsxs = g, q;
}
var J = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var We;
function gr() {
  return We || (We = 1, process.env.NODE_ENV !== "production" && function() {
    var x = Me, l = Symbol.for("react.element"), c = Symbol.for("react.portal"), E = Symbol.for("react.fragment"), A = Symbol.for("react.strict_mode"), D = Symbol.for("react.profiler"), g = Symbol.for("react.provider"), p = Symbol.for("react.context"), t = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), b = Symbol.for("react.suspense_list"), o = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), I = Symbol.for("react.offscreen"), w = Symbol.iterator, M = "@@iterator";
    function N(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = w && e[w] || e[M];
      return typeof r == "function" ? r : null;
    }
    var m = x.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function _(e) {
      {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
          n[a - 1] = arguments[a];
        P("error", e, n);
      }
    }
    function P(e, r, n) {
      {
        var a = m.ReactDebugCurrentFrame, f = a.getStackAddendum();
        f !== "" && (r += "%s", n = n.concat([f]));
        var v = n.map(function(u) {
          return String(u);
        });
        v.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, v);
      }
    }
    var Z = !1, i = !1, y = !1, d = !1, $ = !1, W;
    W = Symbol.for("react.module.reference");
    function Q(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === E || e === D || $ || e === A || e === T || e === b || d || e === I || Z || i || y || typeof e == "object" && e !== null && (e.$$typeof === S || e.$$typeof === o || e.$$typeof === g || e.$$typeof === p || e.$$typeof === t || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === W || e.getModuleId !== void 0));
    }
    function ve(e, r, n) {
      var a = e.displayName;
      if (a)
        return a;
      var f = r.displayName || r.name || "";
      return f !== "" ? n + "(" + f + ")" : n;
    }
    function X(e) {
      return e.displayName || "Context";
    }
    function j(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && _("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case E:
          return "Fragment";
        case c:
          return "Portal";
        case D:
          return "Profiler";
        case A:
          return "StrictMode";
        case T:
          return "Suspense";
        case b:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case p:
            var r = e;
            return X(r) + ".Consumer";
          case g:
            var n = e;
            return X(n._context) + ".Provider";
          case t:
            return ve(e, e.render, "ForwardRef");
          case o:
            var a = e.displayName || null;
            return a !== null ? a : j(e.type) || "Memo";
          case S: {
            var f = e, v = f._payload, u = f._init;
            try {
              return j(u(v));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var C = Object.assign, Y = 0, U, ee, me, ye, ge, _e, he;
    function be() {
    }
    be.__reactDisabledLog = !0;
    function Ye() {
      {
        if (Y === 0) {
          U = console.log, ee = console.info, me = console.warn, ye = console.error, ge = console.group, _e = console.groupCollapsed, he = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: be,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        Y++;
      }
    }
    function Ne() {
      {
        if (Y--, Y === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: C({}, e, {
              value: U
            }),
            info: C({}, e, {
              value: ee
            }),
            warn: C({}, e, {
              value: me
            }),
            error: C({}, e, {
              value: ye
            }),
            group: C({}, e, {
              value: ge
            }),
            groupCollapsed: C({}, e, {
              value: _e
            }),
            groupEnd: C({}, e, {
              value: he
            })
          });
        }
        Y < 0 && _("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var oe = m.ReactCurrentDispatcher, ie;
    function re(e, r, n) {
      {
        if (ie === void 0)
          try {
            throw Error();
          } catch (f) {
            var a = f.stack.trim().match(/\n( *(at )?)/);
            ie = a && a[1] || "";
          }
        return `
` + ie + e;
      }
    }
    var se = !1, te;
    {
      var Ve = typeof WeakMap == "function" ? WeakMap : Map;
      te = new Ve();
    }
    function Re(e, r) {
      if (!e || se)
        return "";
      {
        var n = te.get(e);
        if (n !== void 0)
          return n;
      }
      var a;
      se = !0;
      var f = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var v;
      v = oe.current, oe.current = null, Ye();
      try {
        if (r) {
          var u = function() {
            throw Error();
          };
          if (Object.defineProperty(u.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(u, []);
            } catch (F) {
              a = F;
            }
            Reflect.construct(e, [], u);
          } else {
            try {
              u.call();
            } catch (F) {
              a = F;
            }
            e.call(u.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (F) {
            a = F;
          }
          e();
        }
      } catch (F) {
        if (F && a && typeof F.stack == "string") {
          for (var s = F.stack.split(`
`), O = a.stack.split(`
`), h = s.length - 1, R = O.length - 1; h >= 1 && R >= 0 && s[h] !== O[R]; )
            R--;
          for (; h >= 1 && R >= 0; h--, R--)
            if (s[h] !== O[R]) {
              if (h !== 1 || R !== 1)
                do
                  if (h--, R--, R < 0 || s[h] !== O[R]) {
                    var L = `
` + s[h].replace(" at new ", " at ");
                    return e.displayName && L.includes("<anonymous>") && (L = L.replace("<anonymous>", e.displayName)), typeof e == "function" && te.set(e, L), L;
                  }
                while (h >= 1 && R >= 0);
              break;
            }
        }
      } finally {
        se = !1, oe.current = v, Ne(), Error.prepareStackTrace = f;
      }
      var z = e ? e.displayName || e.name : "", V = z ? re(z) : "";
      return typeof e == "function" && te.set(e, V), V;
    }
    function Be(e, r, n) {
      return Re(e, !1);
    }
    function ze(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function ne(e, r, n) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Re(e, ze(e));
      if (typeof e == "string")
        return re(e);
      switch (e) {
        case T:
          return re("Suspense");
        case b:
          return re("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case t:
            return Be(e.render);
          case o:
            return ne(e.type, r, n);
          case S: {
            var a = e, f = a._payload, v = a._init;
            try {
              return ne(v(f), r, n);
            } catch {
            }
          }
        }
      return "";
    }
    var G = Object.prototype.hasOwnProperty, Ee = {}, we = m.ReactDebugCurrentFrame;
    function ae(e) {
      if (e) {
        var r = e._owner, n = ne(e.type, e._source, r ? r.type : null);
        we.setExtraStackFrame(n);
      } else
        we.setExtraStackFrame(null);
    }
    function Xe(e, r, n, a, f) {
      {
        var v = Function.call.bind(G);
        for (var u in e)
          if (v(e, u)) {
            var s = void 0;
            try {
              if (typeof e[u] != "function") {
                var O = Error((a || "React class") + ": " + n + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw O.name = "Invariant Violation", O;
              }
              s = e[u](r, u, a, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (h) {
              s = h;
            }
            s && !(s instanceof Error) && (ae(f), _("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", n, u, typeof s), ae(null)), s instanceof Error && !(s.message in Ee) && (Ee[s.message] = !0, ae(f), _("Failed %s type: %s", n, s.message), ae(null));
          }
      }
    }
    var Ge = Array.isArray;
    function ce(e) {
      return Ge(e);
    }
    function qe(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, n = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return n;
      }
    }
    function Je(e) {
      try {
        return xe(e), !1;
      } catch {
        return !0;
      }
    }
    function xe(e) {
      return "" + e;
    }
    function Se(e) {
      if (Je(e))
        return _("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", qe(e)), xe(e);
    }
    var Te = m.ReactCurrentOwner, He = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ce, Oe;
    function Ke(e) {
      if (G.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Ze(e) {
      if (G.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Qe(e, r) {
      typeof e.ref == "string" && Te.current;
    }
    function er(e, r) {
      {
        var n = function() {
          Ce || (Ce = !0, _("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: n,
          configurable: !0
        });
      }
    }
    function rr(e, r) {
      {
        var n = function() {
          Oe || (Oe = !0, _("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: n,
          configurable: !0
        });
      }
    }
    var tr = function(e, r, n, a, f, v, u) {
      var s = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: l,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: n,
        props: u,
        // Record the component responsible for creating this element.
        _owner: v
      };
      return s._store = {}, Object.defineProperty(s._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(s, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: a
      }), Object.defineProperty(s, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: f
      }), Object.freeze && (Object.freeze(s.props), Object.freeze(s)), s;
    };
    function nr(e, r, n, a, f) {
      {
        var v, u = {}, s = null, O = null;
        n !== void 0 && (Se(n), s = "" + n), Ze(r) && (Se(r.key), s = "" + r.key), Ke(r) && (O = r.ref, Qe(r, f));
        for (v in r)
          G.call(r, v) && !He.hasOwnProperty(v) && (u[v] = r[v]);
        if (e && e.defaultProps) {
          var h = e.defaultProps;
          for (v in h)
            u[v] === void 0 && (u[v] = h[v]);
        }
        if (s || O) {
          var R = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          s && er(u, R), O && rr(u, R);
        }
        return tr(e, s, O, f, a, Te.current, u);
      }
    }
    var ue = m.ReactCurrentOwner, Pe = m.ReactDebugCurrentFrame;
    function B(e) {
      if (e) {
        var r = e._owner, n = ne(e.type, e._source, r ? r.type : null);
        Pe.setExtraStackFrame(n);
      } else
        Pe.setExtraStackFrame(null);
    }
    var le;
    le = !1;
    function fe(e) {
      return typeof e == "object" && e !== null && e.$$typeof === l;
    }
    function Fe() {
      {
        if (ue.current) {
          var e = j(ue.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function ar(e) {
      return "";
    }
    var Ae = {};
    function or(e) {
      {
        var r = Fe();
        if (!r) {
          var n = typeof e == "string" ? e : e.displayName || e.name;
          n && (r = `

Check the top-level render call using <` + n + ">.");
        }
        return r;
      }
    }
    function je(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var n = or(r);
        if (Ae[n])
          return;
        Ae[n] = !0;
        var a = "";
        e && e._owner && e._owner !== ue.current && (a = " It was passed a child from " + j(e._owner.type) + "."), B(e), _('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', n, a), B(null);
      }
    }
    function ke(e, r) {
      {
        if (typeof e != "object")
          return;
        if (ce(e))
          for (var n = 0; n < e.length; n++) {
            var a = e[n];
            fe(a) && je(a, r);
          }
        else if (fe(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var f = N(e);
          if (typeof f == "function" && f !== e.entries)
            for (var v = f.call(e), u; !(u = v.next()).done; )
              fe(u.value) && je(u.value, r);
        }
      }
    }
    function ir(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var n;
        if (typeof r == "function")
          n = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === t || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === o))
          n = r.propTypes;
        else
          return;
        if (n) {
          var a = j(r);
          Xe(n, e.props, "prop", a, e);
        } else if (r.PropTypes !== void 0 && !le) {
          le = !0;
          var f = j(r);
          _("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", f || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && _("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function sr(e) {
      {
        for (var r = Object.keys(e.props), n = 0; n < r.length; n++) {
          var a = r[n];
          if (a !== "children" && a !== "key") {
            B(e), _("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", a), B(null);
            break;
          }
        }
        e.ref !== null && (B(e), _("Invalid attribute `ref` supplied to `React.Fragment`."), B(null));
      }
    }
    var Le = {};
    function De(e, r, n, a, f, v) {
      {
        var u = Q(e);
        if (!u) {
          var s = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var O = ar();
          O ? s += O : s += Fe();
          var h;
          e === null ? h = "null" : ce(e) ? h = "array" : e !== void 0 && e.$$typeof === l ? (h = "<" + (j(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : h = typeof e, _("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", h, s);
        }
        var R = nr(e, r, n, f, v);
        if (R == null)
          return R;
        if (u) {
          var L = r.children;
          if (L !== void 0)
            if (a)
              if (ce(L)) {
                for (var z = 0; z < L.length; z++)
                  ke(L[z], e);
                Object.freeze && Object.freeze(L);
              } else
                _("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ke(L, e);
        }
        if (G.call(r, "key")) {
          var V = j(e), F = Object.keys(r).filter(function(dr) {
            return dr !== "key";
          }), pe = F.length > 0 ? "{key: someKey, " + F.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Le[V + pe]) {
            var pr = F.length > 0 ? "{" + F.join(": ..., ") + ": ...}" : "{}";
            _(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, pe, V, pr, V), Le[V + pe] = !0;
          }
        }
        return e === E ? sr(R) : ir(R), R;
      }
    }
    function cr(e, r, n) {
      return De(e, r, n, !0);
    }
    function ur(e, r, n) {
      return De(e, r, n, !1);
    }
    var lr = ur, fr = cr;
    J.Fragment = E, J.jsx = lr, J.jsxs = fr;
  }()), J;
}
process.env.NODE_ENV === "production" ? de.exports = yr() : de.exports = gr();
var H = de.exports;
const _r = `
  attribute vec2 position;
  void main() { gl_Position = vec4(position, 0.0, 1.0); }
`, hr = `
  precision mediump float;
  uniform vec2 iResolution;
  uniform float iTime;
  uniform vec3 bg_color;
  uniform vec3 p1_color;
  uniform vec3 p2_color;
  uniform vec3 p3_color;
  uniform vec3 p4_color;
  uniform float p1_opacity;
  uniform float p2_opacity;
  uniform float p3_opacity;
  uniform float p4_opacity;
  uniform float p1_scale;
  uniform float p2_scale;
  uniform float p3_scale;
  uniform float p4_scale;

  float pattern1(vec2 c, float s) {
    c /= s;
    vec2 g = mod(floor(c * 0.5), 2.0);
    return mod(g.x + g.y, 2.0);
  }

  float pattern2(vec2 c, float s) {
    c /= s;
    vec2 p = mod(c, 10.0) / 10.0;
    float g1 = step(p.x + p.y, 0.5);
    float g2 = step((1.0 - p.x) + p.y, 0.5);
    float g3 = step(p.x + (1.0 - p.y), 0.5);
    float g4 = step((1.0 - p.x) + (1.0 - p.y), 0.5);
    return max(max(g1, g2), max(g3, g4));
  }

  float pattern3(vec2 c, float s) {
    c /= s;
    vec2 p = mod(c, 20.0);
    return step(p.y, p.x);
  }

  float pattern4(vec2 c, float s) {
    c /= s;
    vec2 p = mod(c, 20.0);
    return step(p.x, p.y);
  }

  void main() {
    vec2 fc = gl_FragCoord.xy;
    float mr = min(iResolution.x, iResolution.y);
    vec2 uv = (fc * 2.0 - iResolution.xy) / mr;
    
    // Linear waves
    float d = -iTime * 0.15, a = 0.0;
    for (float i = 0.0; i < 4.0; ++i) {
      a += cos(i - d - a * uv.x * 0.5);
      d += sin(uv.y * i + a * 0.5);
    }
    d += iTime * 0.15;
    float linearWave = sin(d * 0.5 + a * 0.6) * 0.5 + 0.5;
    
    // Radial waves
    float radialWaves = 0.0;
    
    vec2 center1 = vec2(-0.6, 0.4);
    float dist1 = length(uv - center1);
    radialWaves += sin(dist1 * 8.0 - iTime * 0.5) * 0.5 + 0.5;
    
    vec2 center2 = vec2(0.5, -0.3);
    float dist2 = length(uv - center2);
    radialWaves += sin(dist2 * 6.0 - iTime * 0.375) * 0.5 + 0.5;
    
    vec2 center3 = vec2(0.0, 0.0);
    float dist3 = length(uv - center3);
    radialWaves += sin(dist3 * 10.0 - iTime * 0.625) * 0.5 + 0.5;
    
    radialWaves /= 3.0;
    
    // Combine waves
    float fv = mix(linearWave, radialWaves, 0.5);
    
    // Calculate patterns
    float p1 = pattern1(fc, p1_scale);
    float p2 = pattern2(fc, p2_scale);
    float p3 = pattern3(fc, p3_scale);
    float p4 = pattern4(fc, p4_scale);
    
    float pm; vec3 pc; float op;
    
    if (fv < 0.25) {
      pm = p1;
      pc = p1_color;
      op = p1_opacity;
    } else if (fv < 0.5) {
      pm = p2;
      pc = p2_color;
      op = p2_opacity;
    } else if (fv < 0.75) {
      pm = p3;
      pc = p3_color;
      op = p3_opacity;
    } else {
      pm = p4;
      pc = p4_color;
      op = p4_opacity;
    }
    
    gl_FragColor = vec4(mix(bg_color, pc, pm * op), 1.0);
  }
`;
function Ue(x) {
  const l = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(x);
  return l ? [
    parseInt(l[1], 16) / 255,
    parseInt(l[2], 16) / 255,
    parseInt(l[3], 16) / 255
  ] : [0, 0, 0];
}
function br(x, l) {
  const c = k(null), E = k(null), A = k(null), D = k(Date.now()), g = k(null);
  return $e(() => {
    const p = x.current;
    if (!p) return;
    const t = p.getContext("webgl");
    if (!t) {
      console.error("WebGL not supported");
      return;
    }
    c.current = t;
    const T = () => {
      p.width = window.innerWidth, p.height = window.innerHeight, t.viewport(0, 0, p.width, p.height);
    };
    T();
    const b = (m, _) => {
      const P = t.createShader(_);
      return P ? (t.shaderSource(P, m), t.compileShader(P), P) : null;
    }, o = t.createProgram();
    if (!o) return;
    const S = b(_r, t.VERTEX_SHADER), I = b(hr, t.FRAGMENT_SHADER);
    if (!S || !I) return;
    t.attachShader(o, S), t.attachShader(o, I), t.linkProgram(o), t.useProgram(o), E.current = o;
    const w = t.createBuffer();
    t.bindBuffer(t.ARRAY_BUFFER, w), t.bufferData(
      t.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      t.STATIC_DRAW
    );
    const M = t.getAttribLocation(o, "position");
    t.enableVertexAttribArray(M), t.vertexAttribPointer(M, 2, t.FLOAT, !1, 0, 0), A.current = {
      res: t.getUniformLocation(o, "iResolution"),
      time: t.getUniformLocation(o, "iTime"),
      bg: t.getUniformLocation(o, "bg_color"),
      p1c: t.getUniformLocation(o, "p1_color"),
      p1o: t.getUniformLocation(o, "p1_opacity"),
      p1s: t.getUniformLocation(o, "p1_scale"),
      p2c: t.getUniformLocation(o, "p2_color"),
      p2o: t.getUniformLocation(o, "p2_opacity"),
      p2s: t.getUniformLocation(o, "p2_scale"),
      p3c: t.getUniformLocation(o, "p3_color"),
      p3o: t.getUniformLocation(o, "p3_opacity"),
      p3s: t.getUniformLocation(o, "p3_scale"),
      p4c: t.getUniformLocation(o, "p4_color"),
      p4o: t.getUniformLocation(o, "p4_opacity"),
      p4s: t.getUniformLocation(o, "p4_scale")
    };
    const N = () => {
      if (!t || !A.current) return;
      const m = A.current, _ = Ue(l.backgroundColor), P = Ue(l.patternColor);
      t.uniform2f(m.res, p.width, p.height), t.uniform1f(
        m.time,
        (Date.now() - D.current) / 1e3 * l.animationSpeed
      ), t.uniform3fv(m.bg, _), t.uniform3fv(m.p1c, P), t.uniform1f(m.p1o, l.patternOpacity), t.uniform1f(m.p1s, l.pattern1Scale), t.uniform3fv(m.p2c, P), t.uniform1f(m.p2o, l.patternOpacity), t.uniform1f(m.p2s, l.pattern2Scale), t.uniform3fv(m.p3c, P), t.uniform1f(m.p3o, l.patternOpacity), t.uniform1f(m.p3s, l.pattern3Scale), t.uniform3fv(m.p4c, P), t.uniform1f(m.p4o, l.patternOpacity), t.uniform1f(m.p4s, l.pattern4Scale), t.drawArrays(t.TRIANGLE_STRIP, 0, 4), g.current = requestAnimationFrame(N);
    };
    return N(), window.addEventListener("resize", T), () => {
      window.removeEventListener("resize", T), g.current && cancelAnimationFrame(g.current);
    };
  }, [x, l]), c;
}
function Rr(x, l, c) {
  if (l === "none" || c === 0)
    return 1;
  let E = 1;
  switch (l) {
    case "linear":
      E = 1 - x;
      break;
    case "exponential":
      E = Math.pow(1 - x, 2);
      break;
    case "logarithmic":
      E = 1 - Math.pow(x, 0.5);
      break;
  }
  return 1 - (1 - E) * c;
}
function Er(x, l, c, E) {
  const [A, D] = vr({ spots: 0, fps: 0 }), g = k([]), p = k({ x: 0, y: 0, prevX: 0, prevY: 0 }), t = k({ x: 0, y: 0 }), T = k({
    currentRadius: 0,
    currentOpacity: 0,
    lastMoveTime: Date.now()
  }), b = k({ frameCount: 0, lastFpsTime: Date.now(), fps: 0 }), o = k(null);
  return $e(() => {
    const S = x.current, I = l.current;
    if (!S || !I) return;
    const w = S.getContext("2d");
    if (!w) return;
    const M = () => {
      S.width = window.innerWidth, S.height = window.innerHeight;
    };
    M();
    const N = (i) => {
      p.current.x = i.clientX, p.current.y = i.clientY;
    }, m = (i, y, d, $, W) => {
      g.current.push({
        x: i,
        y,
        opacity: d,
        baseOpacity: d,
        radius: c.baseRadius,
        velX: $,
        velY: W,
        age: 0,
        createdAt: Date.now()
      }), g.current.length > 150 && g.current.shift();
    }, _ = () => {
      for (let i = g.current.length - 1; i >= 0; i--) {
        const y = g.current[i];
        y.age++;
        const d = Math.min(y.age * c.fadeSpeed, 1);
        y.opacity -= c.fadeSpeed, y.radius -= c.fadeSpeed * 100 * c.trailTaper;
        const $ = Rr(
          d,
          c.ageFadeType,
          c.ageFadeStrength
        ), W = y.opacity * $;
        if (W <= 0.01 || y.radius <= 10) {
          g.current.splice(i, 1);
          continue;
        }
        y.renderOpacity = W;
      }
    }, P = (i) => {
      w.save();
      const y = i.renderOpacity !== void 0 ? i.renderOpacity : i.opacity, d = w.createRadialGradient(
        i.x,
        i.y,
        0,
        i.x,
        i.y,
        i.radius + c.blurAmount
      );
      d.addColorStop(0, `rgba(255, 255, 255, ${y})`), d.addColorStop(0.6, `rgba(255, 255, 255, ${y * 0.5})`), d.addColorStop(1, "rgba(255, 255, 255, 0)"), w.beginPath(), w.arc(
        i.x,
        i.y,
        i.radius + c.blurAmount,
        0,
        Math.PI * 2
      ), w.fillStyle = d, w.filter = `blur(${c.blurAmount}px)`, w.fill(), w.restore();
    }, Z = () => {
      w.clearRect(0, 0, S.width, S.height);
      const i = p.current, y = t.current, d = T.current, $ = i.x - i.prevX, W = i.y - i.prevY, Q = $ !== 0 || W !== 0;
      y.x = y.x * 0.8 + $ * 0.2, y.y = y.y * 0.8 + W * 0.2;
      const X = Date.now() - d.lastMoveTime <= c.closeDelay;
      let j = !1;
      if (Q ? (d.lastMoveTime = Date.now(), j = !0) : j = X, j) {
        const U = c.mainCloseSpeed * 100;
        d.currentRadius += U, d.currentRadius > c.baseRadius && (d.currentRadius = c.baseRadius);
        const ee = d.currentRadius / c.baseRadius;
        d.currentOpacity = c.currentOpacity * ee;
      } else {
        d.currentRadius -= c.mainCloseSpeed * 100 * c.mainCloseTaper, d.currentRadius < 0 && (d.currentRadius = 0);
        const U = d.currentRadius / c.baseRadius;
        d.currentOpacity = c.currentOpacity * U;
      }
      if (j && (Q || X)) {
        const U = c.currentOpacity * c.trailMultiplier;
        m(i.x, i.y, U, y.x, y.y);
      }
      _(), w.globalCompositeOperation = "source-over", g.current.forEach((U) => {
        P(U);
      }), d.currentRadius > 0 && P({
        x: i.x,
        y: i.y,
        opacity: d.currentOpacity,
        baseOpacity: d.currentOpacity,
        radius: d.currentRadius,
        velX: y.x,
        velY: y.y
      }), w.globalCompositeOperation = "source-in", w.drawImage(I, 0, 0), w.globalCompositeOperation = "source-over";
      const C = b.current;
      C.frameCount++;
      const Y = Date.now();
      Y - C.lastFpsTime >= 1e3 && (C.fps = C.frameCount, C.frameCount = 0, C.lastFpsTime = Y, E && D({
        spots: g.current.length + 1,
        fps: C.fps
      })), i.prevX = i.x, i.prevY = i.y, o.current = requestAnimationFrame(Z);
    };
    return p.current.x = window.innerWidth / 2, p.current.y = window.innerHeight / 2, p.current.prevX = p.current.x, p.current.prevY = p.current.y, Z(), document.addEventListener("mousemove", N), window.addEventListener("resize", M), () => {
      document.removeEventListener("mousemove", N), window.removeEventListener("resize", M), o.current && cancelAnimationFrame(o.current);
    };
  }, [x, l, c, E]), A;
}
const wr = {
  // Light blob settings (exactly as in your prototype)
  baseRadius: 190,
  blurAmount: 30,
  currentOpacity: 0.9,
  trailMultiplier: 0.4,
  fadeSpeed: 7e-3,
  trailTaper: 2,
  // Age fade settings
  ageFadeType: "exponential",
  ageFadeStrength: 0.7,
  // Main blob animation
  closeDelay: 300,
  mainCloseSpeed: 0.01,
  mainCloseTaper: 1,
  // Fluid pattern settings
  backgroundColor: "#000000",
  patternColor: "#0d00ff",
  patternOpacity: 1,
  // Pattern scales
  pattern1Scale: 1.5,
  pattern2Scale: 0.5,
  pattern3Scale: 0.3,
  pattern4Scale: 0.3,
  // Animation
  animationSpeed: 1
}, xr = "_container_wjdnx_1", Sr = "_containerFullscreen_wjdnx_13", Tr = "_fluidCanvas_wjdnx_31", Cr = "_maskCanvas_wjdnx_49", Or = "_debug_wjdnx_67", K = {
  container: xr,
  containerFullscreen: Sr,
  fluidCanvas: Tr,
  maskCanvas: Cr,
  debug: Or
}, Pr = ({
  fullscreen: x = !1,
  className: l,
  style: c,
  config: E,
  showDebug: A = !1,
  zIndex: D = { fluid: 1, mask: 2 }
}) => {
  const g = k(null), p = k(null), t = mr(
    () => ({
      ...wr,
      ...E
    }),
    [E]
  );
  br(g, t);
  const T = Er(
    p,
    g,
    t,
    A
  ), b = `${K.container} ${x ? K.containerFullscreen : ""} ${l || ""}`.trim();
  return /* @__PURE__ */ H.jsxs("div", { className: b, style: c, children: [
    /* @__PURE__ */ H.jsx(
      "canvas",
      {
        ref: g,
        className: K.fluidCanvas,
        style: { zIndex: D.fluid }
      }
    ),
    /* @__PURE__ */ H.jsx(
      "canvas",
      {
        ref: p,
        className: K.maskCanvas,
        style: { zIndex: D.mask }
      }
    ),
    A && /* @__PURE__ */ H.jsxs("div", { className: K.debug, children: [
      "Light spots: ",
      T.spots,
      /* @__PURE__ */ H.jsx("br", {}),
      "FPS: ",
      T.fps
    ] })
  ] });
};
Pr.displayName = "FluidLightPattern";
export {
  wr as DEFAULT_CONFIG,
  Pr as FluidLightPattern
};

"use strict";
var _extends =
        Object.assign ||
        function (a) {
            for (var b, c = 1; c < arguments.length; c++)
                for (var d in ((b = arguments[c]), b))
                    Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
            return a;
        },
    SwipeListener = function (a, b) {
        if (a) {
            "undefined" != typeof window &&
                (function () {
                    function a(a, b) {
                        b = b || { bubbles: !1, cancelable: !1, detail: void 0 };
                        var c = document.createEvent("CustomEvent");
                        return c.initCustomEvent(a, b.bubbles, b.cancelable, b.detail), c;
                    }
                    return (
                        "function" != typeof window.CustomEvent &&
                        void ((a.prototype = window.Event.prototype), (window.CustomEvent = a))
                    );
                })();
            b || (b = {}),
                (b = _extends(
                    {},
                    {
                        minHorizontal: 10,
                        minVertical: 10,
                        deltaHorizontal: 3,
                        deltaVertical: 5,
                        preventScroll: !1,
                        lockAxis: !0,
                        touch: !0,
                        mouse: !0,
                    },
                    b
                ));
            var c = [],
                d = !1,
                e = function () {
                    d = !0;
                },
                f = function (a) {
                    (d = !1), h(a);
                },
                g = function (a) {
                    d && ((a.changedTouches = [{ clientX: a.clientX, clientY: a.clientY }]), i(a));
                };
            b.mouse &&
                (a.addEventListener("mousedown", e),
                a.addEventListener("mouseup", f),
                a.addEventListener("mousemove", g));
            var h = function (d) {
                    var e = Math.abs,
                        f = Math.max,
                        g = Math.min;
                    if (c.length) {
                        for (
                            var h = "function" == typeof TouchEvent && d instanceof TouchEvent,
                                j = [],
                                k = [],
                                l = { top: !1, right: !1, bottom: !1, left: !1 },
                                m = 0;
                            m < c.length;
                            m++
                        )
                            j.push(c[m].x), k.push(c[m].y);
                        var i = j[0],
                            n = j[j.length - 1],
                            o = k[0],
                            p = k[k.length - 1],
                            q = { x: [i, n], y: [o, p] };
                        if (1 < c.length) {
                            var r = { detail: _extends({ touch: h, target: d.target }, q) },
                                s = new CustomEvent("swiperelease", r);
                            a.dispatchEvent(s);
                        }
                        var t = j[0] - j[j.length - 1],
                            u = "none";
                        u = 0 < t ? "left" : "right";
                        var v,
                            w = g.apply(Math, j),
                            x = f.apply(Math, j);
                        if (
                            (e(t) >= b.minHorizontal &&
                                ("left" == u
                                    ? ((v = e(w - j[j.length - 1])),
                                      v <= b.deltaHorizontal && (l.left = !0))
                                    : "right" == u
                                    ? ((v = e(x - j[j.length - 1])),
                                      v <= b.deltaHorizontal && (l.right = !0))
                                    : void 0),
                            (t = k[0] - k[k.length - 1]),
                            (u = "none"),
                            (u = 0 < t ? "top" : "bottom"),
                            (w = g.apply(Math, k)),
                            (x = f.apply(Math, k)),
                            e(t) >= b.minVertical &&
                                ("top" == u
                                    ? ((v = e(w - k[k.length - 1])),
                                      v <= b.deltaVertical && (l.top = !0))
                                    : "bottom" == u
                                    ? ((v = e(x - k[k.length - 1])),
                                      v <= b.deltaVertical && (l.bottom = !0))
                                    : void 0),
                            ((c = []), l.top || l.right || l.bottom || l.left))
                        ) {
                            b.lockAxis &&
                                ((l.left || l.right) && e(i - n) > e(o - p)
                                    ? (l.top = l.bottom = !1)
                                    : (l.top || l.bottom) &&
                                      e(i - n) < e(o - p) &&
                                      (l.left = l.right = !1));
                            var y = {
                                    detail: _extends(
                                        { directions: l, touch: h, target: d.target },
                                        q
                                    ),
                                },
                                z = new CustomEvent("swipe", y);
                            a.dispatchEvent(z);
                        } else {
                            var A = new CustomEvent("swipecancel", {
                                detail: _extends({ touch: h, target: d.target }, q),
                            });
                            a.dispatchEvent(A);
                        }
                    }
                },
                i = function (d) {
                    b.preventScroll && d.preventDefault();
                    var e = d.changedTouches[0];
                    if ((c.push({ x: e.clientX, y: e.clientY }), 1 < c.length)) {
                        var f = c[0].x,
                            g = c[c.length - 1].x,
                            h = c[0].y,
                            i = c[c.length - 1].y,
                            j = {
                                detail: {
                                    x: [f, g],
                                    y: [h, i],
                                    touch:
                                        "function" == typeof TouchEvent && d instanceof TouchEvent,
                                    target: d.target,
                                },
                            },
                            k = new CustomEvent("swiping", j);
                        a.dispatchEvent(k);
                    }
                },
                j = !1;
            try {
                var k = Object.defineProperty({}, "passive", {
                    get: function () {
                        j = { passive: !b.preventScroll };
                    },
                });
                window.addEventListener("testPassive", null, k),
                    window.removeEventListener("testPassive", null, k);
            } catch (a) {}
            return (
                b.touch &&
                    (a.addEventListener("touchmove", i, j), a.addEventListener("touchend", h)),
                {
                    off: function () {
                        a.removeEventListener("touchmove", i, j),
                            a.removeEventListener("touchend", h),
                            a.removeEventListener("mousedown", e),
                            a.removeEventListener("mouseup", f),
                            a.removeEventListener("mousemove", g);
                    },
                }
            );
        }
    };
"undefined" != typeof module && "undefined" != typeof module.exports
    ? ((module.exports = SwipeListener), (module.exports.default = SwipeListener))
    : "function" == typeof define && define.amd
    ? define([], function () {
          return SwipeListener;
      })
    : (window.SwipeListener = SwipeListener);

/** layui-v1.0.9 MIT License By http://www.layui.com */
;layui.define(function (a) {
    "use strict";
    function t(a) {
        new p(a)
    }

    var e = document, r = "getElementById", n = "getElementsByTagName", s = 0, p = function (a) {
        var t = this, e = t.config = a || {};
        e.item = s++ , t.render(!0)
    };
    p.on = function (a, t, e) {
        return a.attachEvent ? a.attachEvent("on" + t, function () {
                e.call(a, window.even)
            }) : a.addEventListener(t, e, !1), p
    }, p.prototype.type = function () {
        var a = this.config;
        if ("object" == typeof a.cont) return void 0 === a.cont.length ? 2 : 3
    }, p.prototype.view = function () {
        var a = this, t = a.config, e = [], r = {};
        if (t.pages = 0 | t.pages, t.curr = 0 | t.curr || 1, t.groups = "groups" in t ? 0 | t.groups : 5, t.first = "first" in t ? t.first : "&#x9996;&#x9875;", t.last = "last" in t ? t.last : "&#x672B;&#x9875;", t.prev = "prev" in t ? t.prev : "&#x4E0A;&#x4E00;&#x9875;", t.next = "next" in t ? t.next : "&#x4E0B;&#x4E00;&#x9875;", t.pages <= 1) return "";
        for (t.groups > t.pages && (t.groups = t.pages), r.index = Math.ceil((t.curr + (t.groups > 1 && t.groups !== t.pages ? 1 : 0)) / (0 === t.groups ? 1 : t.groups)), t.curr > 1 && t.prev && e.push('<a href="javascript:;" class="layui-laypage-prev" data-page="' + (t.curr - 1) + '">' + t.prev + "</a>"), r.index > 1 && t.first && 0 !== t.groups && e.push('<a href="javascript:;" class="laypage_first" data-page="1"  title="&#x9996;&#x9875;">' + t.first + "</a><span>&#x2026;</span>"), r.poor = Math.floor((t.groups - 1) / 2), r.start = r.index > 1 ? t.curr - r.poor : 1, r.end = r.index > 1 ? function () {
                var a = t.curr + (t.groups - r.poor - 1);
                return a > t.pages ? t.pages : a
            }() : t.groups, r.end - r.start < t.groups - 1 && (r.start = r.end - t.groups + 1); r.start <= r.end; r.start++)r.start === t.curr ? e.push('<span class="layui-laypage-curr"><em class="layui-laypage-em" ' + (/^#/.test(t.skin) ? 'style="background-color:' + t.skin + ';"' : "") + "></em><em>" + r.start + "</em></span>") : e.push('<a href="javascript:;" data-page="' + r.start + '">' + r.start + "</a>");
        return t.pages > t.groups && r.end < t.pages && t.last && 0 !== t.groups && e.push('<span>&#x2026;</span><a href="javascript:;" class="layui-laypage-last" title="&#x5C3E;&#x9875;"  data-page="' + t.pages + '">' + t.last + "</a>"), r.flow = !t.prev && 0 === t.groups, (t.curr !== t.pages && t.next || r.flow) && e.push(function () {
            return r.flow && t.curr === t.pages ? '<span class="layui-laypage-nomore" title="&#x5DF2;&#x6CA1;&#x6709;&#x66F4;&#x591A;">' + t.next + "</span>" : '<a href="javascript:;" class="layui-laypage-next" data-page="' + (t.curr + 1) + '">' + t.next + "</a>"
        }()), '<div class="layui-box layui-laypage layui-laypage-' + (t.skin ? function (a) {
                return /^#/.test(a) ? "molv" : a
            }(t.skin) : "default") + '" id="layui-laypage-' + a.config.item + '">' + e.join("") + function () {
            return t.skip ? '<span class="layui-laypage-total">&#x5230;&#x7B2C; <input type="number" min="1" onkeyup="this.value=this.value.replace(/\\D/, \'\');" value="' + t.curr + '" class="layui-laypage-skip"> &#x9875; <button type="button" class="layui-laypage-btn">&#x786e;&#x5b9a;</button></span>' : ""
        }() + "</div>"
    }, p.prototype.jump = function (a) {
        if (a) {
            for (var t = this, e = t.config, r = a.children, s = a[n]("button")[0], i = a[n]("input")[0], u = 0, o = r.length; u < o; u++)"a" === r[u].nodeName.toLowerCase() && p.on(r[u], "click", function () {
                var a = 0 | this.getAttribute("data-page");
                e.curr = a, t.render()
            });
            s && p.on(s, "click", function () {
                var a = 0 | i.value.replace(/\s|\D/g, "");
                a && a <= e.pages && (e.curr = a, t.render())
            })
        }
    }, p.prototype.render = function (a) {
        var t = this, n = t.config, s = t.type(), p = t.view();
        2 === s ? n.cont.innerHTML = p : 3 === s ? n.cont.html(p) : e[r](n.cont).innerHTML = p, n.jump && n.jump(n, a), t.jump(e[r]("layui-laypage-" + n.item)), n.hash && !a && (location.hash = "!" + n.hash + "=" + n.curr)
    }, a("laypage", t)
});
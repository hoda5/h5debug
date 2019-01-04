"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@hoda5/extensions");
exports.h5debug = {};
function enableDebug(name, opts) {
    var history = [];
    var m = {
        history: function () {
            return history;
        },
    };
    exports.h5debug[name] = m.mergeObjWith(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (opts && opts.handler) {
            if (opts.handler.apply(opts, args) === false)
                return;
        }
        if (!(opts && opts.disableHistory)) {
            history.push(args.map(function (a) {
                return typeof a === "string" ? a : JSON.stringify(a);
            })
                .join(""));
        }
        // tslint:disable-next-line:no-console
        if (!(opts && opts.disbleConsole))
            console.log.apply(console, [name].concat(args));
    });
}
exports.enableDebug = enableDebug;
function disableDebug(name) {
    delete exports.h5debug[name];
}
exports.disableDebug = disableDebug;
function compareHistory(history, expect) {
    var ih = 0;
    var ie = 0;
    var matches = [];
    while (ih < history.length && ie < expect.length) {
        if (match())
            ie++;
        ih++;
    }
    if (ie < expect.length) {
        return matches.concat(["not matches: ",
            expect.slice(ie).map(function (e) { return e.toString(); }).join("|"),
        ].join(""));
    }
    return "OK";
    function match() {
        var h = history[ih];
        var e = expect[ie];
        var sr = "";
        if (typeof e === "string") {
            var r1 = h.indexOf(e) >= 0;
            if (r1)
                sr = e;
        }
        else if (e.test(h))
            sr = e.toString();
        if (!sr) {
            matches.push("=>(SKIP) " + h);
            return false;
        }
        var m = ["=>(OK:", sr, ") ", h];
        matches.push(m.join(""));
        return true;
    }
}
exports.compareHistory = compareHistory;
//# sourceMappingURL=h5debug.js.map
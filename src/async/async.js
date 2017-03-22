"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parallel_1 = require("./parallel");
var Async = (function () {
    function Async() {
    }
    Async.parallel = function (callbacks) {
        return new parallel_1.Parallel(callbacks);
    };
    return Async;
}());
exports.Async = Async;

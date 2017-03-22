"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = {
    required: {
        selector: 'required',
        name: 'required',
        validate: function (next) {
            next('hello world');
        },
        message: 'Field '
    }
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = [
    {
        name: 'required',
        validate: function (next, value) {
            next(!!value);
        },
        message: 'Field %attributes["v-name"]% is required'
    }
];

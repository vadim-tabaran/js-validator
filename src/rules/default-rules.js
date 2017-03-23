"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = [
    {
        name: 'required',
        validate: function (next) {
            next('Hi i am %user.name%. I am %user.age% old!');
        },
        message: 'Field '
    }
];

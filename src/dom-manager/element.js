"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("../validator");
var ElementDomManager = (function () {
    function ElementDomManager() {
    }
    ElementDomManager.hasAttribute = function (element, attrKey) {
        if (typeof element.hasAttribute !== 'function') {
            return false;
        }
        return element.hasAttribute(validator_1.Validator.preFix + attrKey);
    };
    ElementDomManager.getAttribute = function (element, attrKey) {
        if (!ElementDomManager.hasAttribute(element, attrKey)) {
            return false;
        }
        return element.getAttribute(validator_1.Validator.preFix + attrKey);
    };
    ElementDomManager.getParentNode = function (element) {
        return element.parentNode;
    };
    ElementDomManager.hasParentNode = function (element) {
        return !!element.parentNode;
    };
    return ElementDomManager;
}());
exports.ElementDomManager = ElementDomManager;

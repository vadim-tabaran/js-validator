/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var parallel_1 = __webpack_require__(1);
var Async = (function () {
    function Async() {
    }
    Async.parallel = function (callbacks) {
        return new parallel_1.Parallel(callbacks);
    };
    return Async;
}());
exports.Async = Async;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Parallel = (function () {
    function Parallel(callbacks) {
        this.results = [];
        this.ruleStack = [];
        if (!Array.isArray(callbacks)) {
            callbacks = [callbacks];
        }
        this.ruleStack = this.ruleStack.concat(callbacks);
    }
    Parallel.prototype.appendChain = function (callbacks) {
        if (!Array.isArray(callbacks)) {
            callbacks = [callbacks];
        }
        this.ruleStack = this.ruleStack.concat(callbacks);
        return this;
    };
    Parallel.prototype.subscribe = function (callback) {
        var _this = this;
        this.endCallback = callback;
        for (var i = 0; i < this.ruleStack.length; i++) {
            this.ruleStack[i].execute(function (validatorResponse) {
                _this.appendResponse(validatorResponse);
            });
        }
        return this;
    };
    Parallel.prototype.appendResponse = function (validatorResponse) {
        this.results.push(new Response(validatorResponse));
        if (this.results.length === this.ruleStack.length) {
            this.endCallback(this.results);
        }
    };
    return Parallel;
}());
exports.Parallel = Parallel;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = __webpack_require__(3);
var DomManager = (function () {
    function DomManager(target) {
        this.formElement = null;
        this.inputs = [];
        this.target = '';
        this.target = target;
    }
    DomManager.prototype.setElements = function () {
        if (typeof this.target === 'string') {
            var targetElement = document.querySelector(this.target);
            if (targetElement instanceof HTMLFormElement) {
                this.formElement = targetElement;
                this.actualizeFormInputs();
                return true;
            }
            else if (targetElement instanceof HTMLInputElement) {
                this.inputs.push(targetElement);
                return true;
            }
            else {
                return new error_1.ErrorHandler('invalidSelector', { 'selector': this.target });
            }
        }
        if (this.target instanceof HTMLInputElement) {
            this.inputs.push(this.target);
            return true;
        }
        return new error_1.ErrorHandler('invalidTarget', { 'target': this.target });
    };
    DomManager.prototype.getForm = function () {
        return this.formElement;
    };
    DomManager.prototype.getInputs = function () {
        return this.inputs;
    };
    DomManager.prototype.actualizeFormInputs = function () {
        if (this.formElement === null) {
            return;
        }
        for (var inputName in this.formElement.elements) {
            var currentElement = this.formElement.elements[inputName];
            if (currentElement instanceof HTMLInputElement && this.inputs.indexOf(currentElement) === -1) {
                this.inputs.push(this.formElement.elements[inputName]);
            }
        }
    };
    DomManager.getAttributeValue = function (element, attributeKey) {
        return element.getAttribute(attributeKey);
    };
    return DomManager;
}());
exports.DomManager = DomManager;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ErrorHandler = (function () {
    function ErrorHandler(key, params) {
        this.key = key;
        this.params = params;
        this.errorMessages = {
            invalidSelector: "Can't find HTMLFormElement or HTMLInputElement on %selector% selector",
            invalidTarget: "Can't find HTMLFormElement or HTMLInputElement on %target% target",
            invalidErrorKey: "Invalid error key '%errorKey%'"
        };
    }
    ErrorHandler.throw = function (key, params) {
        if (key === void 0) { key = ''; }
        if (params === void 0) { params = {}; }
        new ErrorHandler(key, params);
    };
    ErrorHandler.prototype.getMessage = function () {
        if (!(this.key in this.errorMessages)) {
            ErrorHandler.throw("invalidErrorKey");
            return '';
        }
        var currentMessage = this.errorMessages[this.key];
        for (var paramKey in this.params) {
            currentMessage = currentMessage.replace('%' + paramKey + '%', this.params[paramKey]);
        }
        return currentMessage;
    };
    return ErrorHandler;
}());
exports.ErrorHandler = ErrorHandler;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Message = (function () {
    function Message(responses, element) {
        this.responses = responses;
        this.element = element;
        this.showMessage();
    }
    Message.prototype.showMessage = function () {
        var messages = [];
        for (var i = 0; i < this.responses.length; i++) {
            messages.push(this.getMessage(this.responses[i]));
        }
    };
    Message.prototype.getMessage = function (response) {
        return '';
    };
    return Message;
}());
exports.Message = Message;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var default_rules_1 = __webpack_require__(5);
var rule_1 = __webpack_require__(7);
var RulesManager = (function () {
    function RulesManager(htmlInputElement) {
        this.htmlInputElement = htmlInputElement;
    }
    RulesManager.appendRules = function (customRules) {
        for (var ruleName in customRules) {
            RulesManager.rules[ruleName] = customRules[ruleName];
        }
    };
    RulesManager.prototype.extractCallbackChain = function () {
        var callbackChain = [];
        var ruleKeys = Object.keys(RulesManager.rules);
        for (var i = 0; i < ruleKeys.length; i++) {
            var attributeName = 'validation-' + ruleKeys[i];
            if (this.htmlInputElement.hasAttribute(attributeName)) {
                callbackChain.push(new rule_1.ValidationRule(RulesManager.rules[ruleKeys[i]], this.htmlInputElement));
            }
        }
        return callbackChain;
    };
    RulesManager.prototype.get = function (key) { };
    return RulesManager;
}());
RulesManager.rules = default_rules_1.rules;
exports.RulesManager = RulesManager;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ValidationRule = (function () {
    function ValidationRule(rule, htmlInputElement) {
        this.rule = rule;
        this.htmlInputElement = htmlInputElement;
    }
    ValidationRule.prototype.execute = function (appendResponseCallback) {
        this.rule.validate.call(this.htmlInputElement, appendResponseCallback);
        return this;
    };
    return ValidationRule;
}());
exports.ValidationRule = ValidationRule;


/***/ }),
/* 8 */
/***/ (function(module, exports) {



/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_manager_1 = __webpack_require__(2);
var manager_1 = __webpack_require__(6);
var async_1 = __webpack_require__(0);
var message_1 = __webpack_require__(4);
var Validator = (function () {
    function Validator(target, config) {
        if (config === void 0) { config = {}; }
        this.domManager = new dom_manager_1.DomManager(target);
        this.domManager.setElements();
        this.initValidator();
    }
    Validator.prototype.validate = function () {
    };
    Validator.prototype.initValidator = function () {
        this.initFormListener();
        this.initInputsListeners();
    };
    Validator.prototype.initFormListener = function () {
        var _this = this;
        var formElement = this.domManager.getForm();
        if (formElement === null) {
            return;
        }
        formElement.addEventListener("submit", function (event) { return _this.onFormSubmit(event); });
    };
    Validator.prototype.initInputsListeners = function () {
        var _this = this;
        var inputElements = this.domManager.getInputs();
        if (inputElements.length === 0) {
            return;
        }
        for (var i = 0; i < inputElements.length; i++) {
            var htmlInputElement = inputElements[i];
            var validateOnAttributeValue = dom_manager_1.DomManager.getAttributeValue(htmlInputElement, 'validate-on');
            var validateOnArray = validateOnAttributeValue ? validateOnAttributeValue.split('|') : [];
            var validateOnEvents = validateOnArray.length > 0 ? validateOnArray : ['change'];
            for (var i_1 = 0; i_1 < validateOnEvents.length; i_1++) {
                htmlInputElement.addEventListener(validateOnEvents[i_1], function (event) {
                    _this.validateInput(event.target);
                });
            }
        }
    };
    Validator.prototype.validateInput = function (element) {
        var rules = new manager_1.RulesManager(element); //todo Rules manager
        var rulesChain = rules.extractCallbackChain();
        async_1.Async.parallel(rulesChain).subscribe(function (responses) { return new message_1.Message(responses, element); });
    };
    Validator.prototype.onFormSubmit = function (event) {
    };
    Validator.importRules = function () {
    };
    return Validator;
}());
exports.Validator = Validator;
window["Validator"] = Validator;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
__webpack_require__(1);
__webpack_require__(5);
__webpack_require__(8);
__webpack_require__(6);
__webpack_require__(7);
__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(9);
module.exports = __webpack_require__(4);


/***/ })
/******/ ]);
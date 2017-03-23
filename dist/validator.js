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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var validate_input_1 = __webpack_require__(11);
var form_1 = __webpack_require__(3);
var Validator = (function () {
    function Validator(target, config) {
        if (config === void 0) { config = {}; }
        this.formDomManager = new form_1.FormDomManager(target);
        this.formDomManager.setElements();
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
        var formElement = this.formDomManager.getForm();
        if (formElement === null) {
            return;
        }
        formElement.addEventListener("submit", function (event) { return _this.onFormSubmit(event); });
    };
    Validator.prototype.initInputsListeners = function () {
        var inputElements = this.formDomManager.getInputs();
        if (inputElements.length === 0) {
            return;
        }
        for (var i = 0; i < inputElements.length; i++) {
            new validate_input_1.ValidateInput(inputElements[i]);
        }
    };
    Validator.prototype.onFormSubmit = function (event) {
    };
    Validator.importRules = function () {
    };
    return Validator;
}());
Validator.preFix = 'v-';
Validator.rulesSeparator = '|';
exports.Validator = Validator;
window["Validator"] = Validator;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var parallel_1 = __webpack_require__(2);
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
/* 2 */
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
        var _loop_1 = function (i) {
            this_1.ruleStack[i].execute(function (validatorResponse, parameters) {
                _this.appendResponse(validatorResponse, parameters, _this.ruleStack[i]);
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.ruleStack.length; i++) {
            _loop_1(i);
        }
        return this;
    };
    Parallel.prototype.appendResponse = function (validatorResponse, parameters, rule) {
        this.results.push({
            validatorResponse: validatorResponse,
            parameters: parameters,
            rule: rule,
        });
        if (this.results.length === this.ruleStack.length) {
            this.endCallback(this.results);
        }
    };
    return Parallel;
}());
exports.Parallel = Parallel;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = __webpack_require__(5);
var FormDomManager = (function () {
    function FormDomManager(target) {
        this.formElement = null;
        this.inputs = [];
        this.target = '';
        this.target = target;
    }
    FormDomManager.prototype.setElements = function () {
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
    FormDomManager.prototype.getForm = function () {
        return this.formElement;
    };
    FormDomManager.prototype.getInputs = function () {
        return this.inputs;
    };
    FormDomManager.prototype.actualizeFormInputs = function () {
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
    return FormDomManager;
}());
exports.FormDomManager = FormDomManager;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = __webpack_require__(0);
var InputDomManager = (function () {
    function InputDomManager(input) {
        this.input = input;
    }
    InputDomManager.prototype.getInput = function () {
        return this.input;
    };
    InputDomManager.prototype.getValidateOnEvents = function () {
        var validateOnAttributeValue = this.getAttribute('validate-on');
        return validateOnAttributeValue ? validateOnAttributeValue.split('|') : ['change'];
    };
    InputDomManager.prototype.registerListener = function (event, onEventCallback) {
        this.input.addEventListener(event, onEventCallback);
    };
    InputDomManager.prototype.hasAttribute = function (attrKey) {
        return this.input.hasAttribute(validator_1.Validator.preFix + attrKey);
    };
    InputDomManager.prototype.getAttribute = function (attrKey) {
        if (!this.hasAttribute(attrKey)) {
            return false;
        }
        return this.input.getAttribute(validator_1.Validator.preFix + attrKey);
    };
    return InputDomManager;
}());
exports.InputDomManager = InputDomManager;


/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var template_1 = __webpack_require__(7);
var Message = (function () {
    function Message(inputDomManager) {
        this.inputDomManager = inputDomManager;
    }
    Message.prototype.show = function (responses) {
        var messages = [];
        for (var i = 0; i < responses.length; i++) {
            messages.push(this.get(responses[i]));
        }
    };
    Message.prototype.get = function (response) {
        if (response === true) {
            return false;
        }
        if (typeof response === 'string') {
            var template = new template_1.Template(response, this.prepareTemplateParameters());
            return template.extractMessage();
        }
        if (response === false) {
            return 'response - false';
        }
    };
    Message.prototype.prepareTemplateParameters = function () {
        return {
            attr: this.inputDomManager.getInput().attributes,
            params: []
        };
    };
    return Message;
}());
exports.Message = Message;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Template = (function () {
    function Template(message, parameters) {
        this.message = message;
        this.parameters = parameters;
    }
    Template.prototype.extractMessage = function () {
        var params = this.parseParams();
        return 'This is extracted message';
    };
    Template.prototype.parseParams = function () {
        var unpreparedParameters = this.message.match(/%.*?%/g);
        return [];
    };
    return Template;
}());
exports.Template = Template;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var default_rules_1 = __webpack_require__(8);
var rule_1 = __webpack_require__(10);
var RulesManager = (function () {
    function RulesManager(inputDomManager) {
        this.inputDomManager = inputDomManager;
    }
    RulesManager.appendRules = function (customRules) {
        var _loop_1 = function (i) {
            RulesManager.rules.filter(function (rule) { return rule.name != customRules[i].name; });
        };
        for (var i = 0; i < customRules.length; i++) {
            _loop_1(i);
        }
    };
    RulesManager.prototype.extractCallbackChain = function () {
        var callbackChain = [];
        for (var i = 0; i < RulesManager.rules.length; i++) {
            var attributeName = RulesManager.rules[i].name;
            if (this.inputDomManager.hasAttribute(attributeName)) {
                callbackChain.push(new rule_1.ValidationRule(RulesManager.rules[i], this.inputDomManager));
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = __webpack_require__(0);
var ValidationRule = (function () {
    function ValidationRule(rule, inputDomManager) {
        this.rule = rule;
        this.inputDomManager = inputDomManager;
    }
    ValidationRule.prototype.execute = function (appendResponseCallback) {
        var inputParameters = this.extractParameters();
        var validatorParameters = [
            function (validatorResponse) {
                appendResponseCallback(validatorResponse, inputParameters);
            }
        ].concat(inputParameters);
        this.rule.validate.apply(this.inputDomManager.getInput(), validatorParameters);
        return this;
    };
    ValidationRule.prototype.extractParameters = function () {
        var attributeValue = this.inputDomManager.getAttribute(this.rule.name);
        if (attributeValue === false) {
            return [];
        }
        return attributeValue.split(this.inputDomManager.getAttribute('rule-separator') || validator_1.Validator.rulesSeparator);
    };
    return ValidationRule;
}());
exports.ValidationRule = ValidationRule;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var manager_1 = __webpack_require__(9);
var async_1 = __webpack_require__(1);
var message_1 = __webpack_require__(6);
var input_1 = __webpack_require__(4);
var ValidateInput = (function () {
    function ValidateInput(input) {
        this.inputDomManager = new input_1.InputDomManager(input);
        this.rules = new manager_1.RulesManager(this.inputDomManager); //todo Rules manager
        this.message = new message_1.Message(this.inputDomManager);
        this.initListeners();
    }
    ValidateInput.prototype.initListeners = function () {
        var _this = this;
        var validateOnEvents = this.inputDomManager.getValidateOnEvents();
        for (var i = 0; i < validateOnEvents.length; i++) {
            this.inputDomManager.registerListener(validateOnEvents[i], function () { return _this.registerChain(); });
        }
    };
    ValidateInput.prototype.registerChain = function () {
        var _this = this;
        async_1.Async.parallel(this.rules.extractCallbackChain()).subscribe(function (responses) {
            _this.message.show(responses);
        });
    };
    return ValidateInput;
}());
exports.ValidateInput = ValidateInput;


/***/ }),
/* 12 */
/***/ (function(module, exports) {



/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(8);
__webpack_require__(12);
__webpack_require__(9);
__webpack_require__(10);
__webpack_require__(4);
__webpack_require__(3);
__webpack_require__(5);
__webpack_require__(0);
__webpack_require__(6);
__webpack_require__(7);
module.exports = __webpack_require__(11);


/***/ })
/******/ ]);
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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
            featureComing: "Feature '%featureDescription%' is coming but it is have no that functionality!",
            invalidExpression: "Can't execute expression '%expression%'. Details: %details%",
            invalidGroupContainer: "Invalid group container %group%",
            invalidErrorKey: "Invalid error key '%errorKey%'"
        };
        console.error(this.getMessage());
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var form_1 = __webpack_require__(4);
var validate_input_group_1 = __webpack_require__(10);
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
        var groups = {};
        for (var i = 0; i < inputElements.length; i++) {
            if (!groups.hasOwnProperty(inputElements[i].name)) {
                groups[inputElements[i].name] = [];
            }
            groups[inputElements[i].name].push(inputElements[i]);
        }
        for (var groupName in groups) {
            new validate_input_group_1.ValidateInputGroup(groups[groupName]);
        }
    };
    Validator.prototype.onFormSubmit = function (event) {
    };
    Validator.importRules = function () {
    };
    return Validator;
}());
Validator.preFix = 'v-';
Validator.ruleSeparator = '|';
Validator.messagePostFix = '-message';
Validator.customValidateResponseMethodName = 'validate';
Validator.groupAttributeName = 'group';
exports.Validator = Validator;
window["Validator"] = Validator;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var parallel_1 = __webpack_require__(3);
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
/* 3 */
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
    Parallel.prototype.subscribe = function (callback) {
        var _this = this;
        this.endCallback = callback;
        for (var i = 0; i < this.ruleStack.length; i++) {
            this.ruleStack[i](function (validatorResponse) {
                _this.appendResponse(validatorResponse);
            });
        }
        return this;
    };
    Parallel.prototype.appendResponse = function (validatorResponse) {
        this.results.push(validatorResponse);
        if (this.results.length === this.ruleStack.length) {
            this.endCallback(this.results);
        }
    };
    return Parallel;
}());
exports.Parallel = Parallel;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = __webpack_require__(0);
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var element_1 = __webpack_require__(12);
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
        return element_1.ElementDomManager.hasAttribute(this.input, attrKey);
    };
    InputDomManager.prototype.getAttribute = function (attrKey) {
        return element_1.ElementDomManager.getAttribute(this.input, attrKey);
    };
    InputDomManager.prototype.getValue = function () {
        if (this.input instanceof HTMLSelectElement) {
            return this.input.options[this.input.selectedIndex].nodeValue;
        }
        if (['radio', 'checkbox'].indexOf(this.input.getAttribute('type')) !== -1) {
            var checkedInput = document.querySelector('input[name="' + this.input.name + '"]:checked');
            return checkedInput ? checkedInput.value : false;
        }
        return this.input.value;
    };
    return InputDomManager;
}());
exports.InputDomManager = InputDomManager;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var template_1 = __webpack_require__(7);
var default_validate_message_1 = __webpack_require__(13);
var Message = (function () {
    function Message(inputDomManager) {
        this.inputDomManager = inputDomManager;
        this.validatorView = new default_validate_message_1.DefaultValidatorView(this.inputDomManager); // todo add customization for validation message view
    }
    Message.prototype.show = function (validatorResponses) {
        this.validatorView.destroy();
        var messagesList = this.getMessageList(validatorResponses);
        this.validatorView.show(messagesList);
    };
    Message.prototype.getMessageList = function (validatorResponses) {
        var messages = [];
        for (var i = 0; i < validatorResponses.length; i++) {
            var currMessage = this.getMessage(validatorResponses[i]);
            if (typeof currMessage === 'string') {
                messages.push(currMessage);
            }
        }
        return messages;
    };
    Message.prototype.getMessage = function (response) {
        if (response.validatorResponse === true) {
            return false;
        }
        var template = new template_1.Template(response);
        return template.extractMessage();
    };
    return Message;
}());
exports.Message = Message;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = __webpack_require__(1);
var error_1 = __webpack_require__(0);
var Template = (function () {
    function Template(templateConfig) {
        this.rule = templateConfig.rule;
        this.inputParameters = templateConfig.inputParameters;
        this.inputDomManager = templateConfig.inputDomManager;
        this.validatorResponse = templateConfig.validatorResponse;
    }
    Template.prototype.extractMessage = function () {
        var messageTemplate = this.getMessageTemplate();
        if (['string', 'boolean'].indexOf(typeof messageTemplate) === -1) {
            return error_1.ErrorHandler.throw('featureComing', {
                featureDescription: 'Response from validator should be a template string or boolean message'
            });
        }
        if (messageTemplate !== true) {
            var params_1 = this.parseTemplateParams(messageTemplate);
            this.virtualVariableSpace.apply(null, [
                params_1,
                this.inputParameters,
                this.prepareAttributes()
            ]).forEach(function (value, index) {
                messageTemplate = messageTemplate.replace('%' + params_1[index] + '%', value);
            });
        }
        return messageTemplate;
    };
    Template.prototype.prepareAttributes = function () {
        var attributes = this.inputDomManager.getInput().attributes;
        var attributesAssoc = {};
        for (var i = 0; i < attributes.length; i++) {
            attributesAssoc[attributes[i].name] = attributes[i].value;
        }
        return attributesAssoc;
    };
    Template.prototype.parseTemplateParams = function (params) {
        if (typeof params !== 'string') {
            return [];
        }
        var paramsArray = params.match(/%.*?%/g) || [];
        return paramsArray.map(function (value) { return value.replace(/^%|%$/g, ''); });
    };
    Template.prototype.virtualVariableSpace = function (templateParams, params, attributes) {
        var result = [];
        for (var i = 0; i < templateParams.length; i++) {
            try {
                result.push(eval(templateParams[i])); // todo create a parser for it. Eval is evil!
            }
            catch (message) {
                error_1.ErrorHandler.throw('invalidExpression', { expression: templateParams[i], details: message });
            }
        }
        return result;
    };
    Template.prototype.getMessageTemplate = function () {
        if (this.inputDomManager.hasAttribute(this.rule.name + validator_1.Validator.messagePostFix)) {
            return this.inputDomManager.getAttribute(this.rule.name + validator_1.Validator.messagePostFix);
        }
        if (this.validatorResponse instanceof Function) {
            return this.validatorResponse();
        }
        if (this.validatorResponse instanceof Object &&
            this.validatorResponse.hasOwnProperty(validator_1.Validator.customValidateResponseMethodName) &&
            this.validatorResponse[validator_1.Validator.customValidateResponseMethodName] instanceof Function) {
            return this.validatorResponse[validator_1.Validator.customValidateResponseMethodName];
        }
        if (typeof this.validatorResponse === 'string') {
            return this.validatorResponse;
        }
        if (this.validatorResponse === false) {
            return this.rule.message;
        }
        return true;
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
        validate: function (next, value) {
            next(!!value);
        },
        message: 'Field %attributes["v-name"]% is required'
    }
];


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var default_rules_1 = __webpack_require__(8);
var RulesManager = (function () {
    function RulesManager() {
    }
    RulesManager.appendRules = function (customRules) {
        var _loop_1 = function (i) {
            RulesManager.rules.filter(function (rule) { return rule.name != customRules[i].name; });
        };
        for (var i = 0; i < customRules.length; i++) {
            _loop_1(i);
        }
    };
    return RulesManager;
}());
RulesManager.rules = default_rules_1.rules;
exports.RulesManager = RulesManager;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/var/www/validator.loc/src/validate-input-group.ts'\n    at Error (native)");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var manager_1 = __webpack_require__(9);
var async_1 = __webpack_require__(2);
var message_1 = __webpack_require__(6);
var input_1 = __webpack_require__(5);
var validator_1 = __webpack_require__(1);
var error_1 = __webpack_require__(0);
var element_1 = __webpack_require__(12);
var ValidateInput = (function () {
    function ValidateInput(input, group) {
        this.inputDomManager = new input_1.InputDomManager(input);
        this.message = new message_1.Message(this.inputDomManager);
        this.group = group;
        this.initListeners();
    }
    ValidateInput.prototype.extractCallbackChain = function () {
        var callbackChain = [];
        var input = this.inputDomManager.getInput();
        if (this.group.length() === 1) {
            callbackChain = this.extractRulesFromAttributes(input);
        }
        else {
            var groupContainer = this.getGroupContainer();
            if (groupContainer === false) {
                error_1.ErrorHandler.throw('invalidGroupContainer', { group: this.inputDomManager.getInput().name });
                return [];
            }
            callbackChain = this.extractRulesFromAttributes(groupContainer);
        }
        return callbackChain;
    };
    ValidateInput.prototype.getGroupContainer = function () {
        var currentNode = this.inputDomManager.getInput();
        var groupName = currentNode.name;
        while (element_1.ElementDomManager.hasParentNode(currentNode)) {
            currentNode = element_1.ElementDomManager.getParentNode(currentNode);
            if (this.isGroupContainer(currentNode, groupName)) {
                return currentNode;
            }
        }
        return false;
    };
    ValidateInput.prototype.isGroupContainer = function (node, groupName) {
        return element_1.ElementDomManager.hasAttribute(node, validator_1.Validator.groupAttributeName) &&
            element_1.ElementDomManager.getAttribute(node, validator_1.Validator.groupAttributeName) === groupName;
    };
    ValidateInput.prototype.initListeners = function () {
        var _this = this;
        var validateOnEvents = this.inputDomManager.getValidateOnEvents();
        for (var i = 0; i < validateOnEvents.length; i++) {
            this.inputDomManager.registerListener(validateOnEvents[i], function () { return _this.registerChain(); });
        }
    };
    ValidateInput.prototype.registerChain = function () {
        var _this = this;
        async_1.Async.parallel(this.extractCallbackChain()).subscribe(function (responses) {
            _this.message.show(responses);
        });
    };
    ValidateInput.prototype.extractRulesFromAttributes = function (element) {
        if (element === false) {
            error_1.ErrorHandler.throw('invalidGroupContainer', { group: this.inputDomManager.getInput().name });
            return [];
        }
        var callbackChain = [];
        for (var i = 0; i < manager_1.RulesManager.rules.length; i++) {
            var attributeName = manager_1.RulesManager.rules[i].name;
            if (element_1.ElementDomManager.hasAttribute(element, attributeName)) {
                callbackChain.push(this.prepareRuleCallback(manager_1.RulesManager.rules[i]));
            }
        }
        return callbackChain;
    };
    ValidateInput.prototype.prepareRuleCallback = function (rule) {
        var _this = this;
        return function (appendResponseCallback) {
            var inputParameters = _this.extractParameters(rule);
            var validatorParameters = [
                function (validatorResponse) {
                    appendResponseCallback({
                        validatorResponse: validatorResponse,
                        inputParameters: inputParameters,
                        inputDomManager: _this.inputDomManager,
                        rule: rule
                    });
                },
                _this.inputDomManager.getValue()
            ].concat(inputParameters);
            rule.validate.apply(_this.inputDomManager.getInput(), validatorParameters);
        };
    };
    ValidateInput.prototype.extractParameters = function (rule) {
        var attributeValue = this.inputDomManager.getAttribute(rule.name);
        if (attributeValue === false) {
            return [];
        }
        return attributeValue.split(this.inputDomManager.getAttribute('rule-separator') || validator_1.Validator.ruleSeparator);
    };
    return ValidateInput;
}());
exports.ValidateInput = ValidateInput;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = __webpack_require__(1);
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


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DefaultValidatorView = (function () {
    function DefaultValidatorView(inputDomManager) {
        this.inputDomManager = inputDomManager;
    }
    DefaultValidatorView.prototype.show = function (messages) {
        console.log(messages);
    };
    DefaultValidatorView.prototype.destroy = function () {
    };
    return DefaultValidatorView;
}());
exports.DefaultValidatorView = DefaultValidatorView;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(8);
__webpack_require__(9);
__webpack_require__(5);
__webpack_require__(4);
__webpack_require__(0);
__webpack_require__(1);
__webpack_require__(6);
__webpack_require__(7);
__webpack_require__(11);
module.exports = __webpack_require__(10);


/***/ })
/******/ ]);
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultValidatorView = (function () {
    function DefaultValidatorView(inputDomManager) {
        this.inputDomManager = inputDomManager;
    }
    DefaultValidatorView.prototype.show = function (messages) {
        this.currentInput = this.inputDomManager.getInput();
        var elementPositions = this.currentInput.getBoundingClientRect();
        this.currentInput.parentElement.style.position = 'relative';
        this.messageContainer = this.createMessageContainer(elementPositions);
        this.appendValidatorMessages(messages);
        this.addCloseListener();
    };
    DefaultValidatorView.prototype.destroy = function () {
    };
    DefaultValidatorView.prototype.appendValidatorMessages = function (messages) {
        this.messageContainer.textContent = messages.join('<br/>');
        this.currentInput.parentNode.appendChild(this.messageContainer);
    };
    DefaultValidatorView.prototype.addCloseListener = function () {
        this.messageContainer.addEventListener('click', function (event) {
            var divElement = event.target;
            divElement.parentElement.removeChild(divElement);
        });
    };
    DefaultValidatorView.prototype.createMessageContainer = function (elementPositions) {
        var messageContainer = document.createElement("div");
        messageContainer.classList.add('validateMessage');
        messageContainer.style.top = elementPositions.top;
        return messageContainer;
    };
    return DefaultValidatorView;
}());
exports.DefaultValidatorView = DefaultValidatorView;

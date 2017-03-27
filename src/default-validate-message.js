"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultValidatorView = (function () {
    function DefaultValidatorView(inputDomManager) {
        this.inputDomManager = inputDomManager;
    }
    DefaultValidatorView.prototype.show = function (messages) {
        this.currentInput = this.inputDomManager.getInput();
        var elementPositions = this.currentInput.getBoundingClientRect();
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
        messageContainer.style.position = 'absolute';
        messageContainer.style.top = elementPositions.top;
        messageContainer.style.left = elementPositions.left;
        messageContainer.style.backgroundColor = 'red';
        messageContainer.style.maxWidth = '500px';
        messageContainer.style.padding = '5px';
        return messageContainer;
    };
    return DefaultValidatorView;
}());
exports.DefaultValidatorView = DefaultValidatorView;

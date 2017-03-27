import { InputDomManager } from "./dom-manager/input";

export class DefaultValidatorView implements MessagesView {
  private currentInput: HTMLInputElement;
  private messageContainer: HTMLDivElement;

  constructor(
    private inputDomManager: InputDomManager
  ) {}

  show(messages: string[]) {
    this.currentInput = this.inputDomManager.getInput();
    let elementPositions = this.currentInput.getBoundingClientRect();

    this.messageContainer = this.createMessageContainer(elementPositions);
    this.appendValidatorMessages(messages);
    this.addCloseListener();

  }

  destroy() {

  }

  private appendValidatorMessages(messages: string[]) {
    this.messageContainer.textContent = messages.join('<br/>');
    this.currentInput.parentNode.appendChild(this.messageContainer);
  }

  private addCloseListener() {
    this.messageContainer.addEventListener('click', (event) => {
      let divElement = <HTMLDivElement>event.target;
      divElement.parentElement.removeChild(divElement);
    });
  }

  private createMessageContainer(elementPositions) {
    let messageContainer = document.createElement("div");

    messageContainer.style.position = 'absolute';
    messageContainer.style.top = elementPositions.top;
    messageContainer.style.left = elementPositions.left;
    messageContainer.style.backgroundColor = 'red';
    messageContainer.style.maxWidth = '500px';
    messageContainer.style.padding = '5px';

    return messageContainer;
  }
}
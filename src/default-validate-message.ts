import { ValidateInputGroup } from "./validate-input-group";

export class DefaultValidatorView implements MessagesView {
  private messageContainer: HTMLDivElement | null = null;
  private groupContainer: Element;

  constructor(private group: ValidateInputGroup) {}

  show(messages: string[]) {
    this.groupContainer = this.group.getContainer();
    let elementPositions = this.groupContainer.getBoundingClientRect();

    this.messageContainer = this.createMessageContainer(elementPositions);
    this.appendValidatorMessages(messages);
    this.addCloseListener();
  }

  destroy() {
    if (this.messageContainer) {
      this.messageContainer.parentElement.removeChild(this.messageContainer);
      this.messageContainer = null;
    }
  }

  private appendValidatorMessages(messages: string[]) {
    this.messageContainer.textContent = messages.join('<br/>');
    this.groupContainer.parentNode.appendChild(this.messageContainer);
  }

  private addCloseListener() {
    this.messageContainer.addEventListener('click', (event) => {
      let divElement = <HTMLDivElement>event.target;
      divElement.parentElement.removeChild(divElement);
    });
  }

  private createMessageContainer(elementPositions) {
    let messageContainer = document.createElement("div");

    messageContainer.style.top = elementPositions.top;

    return messageContainer;
  }
}
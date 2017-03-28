import { InputDomManager } from "./dom-manager/input";

export class DefaultValidatorView implements MessagesView{
  constructor(
    private inputDomManager: InputDomManager
  ) {}

  show(messages: string[]) {
    console.log(messages);
  }

  destroy() {

  }
}
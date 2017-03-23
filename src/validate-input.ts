import { RulesManager } from "./rules/manager";
import { Async } from "./async/async";
import { Message } from "./message/message";
import { InputDomManager } from "./dom-manager/input";

export class ValidateInput {
  private rules: RulesManager;
  private inputDomManager: InputDomManager;
  private message: Message;

  constructor(input: HTMLInputElement) {
    this.inputDomManager = new InputDomManager(input);
    this.rules = new RulesManager(this.inputDomManager); //todo Rules manager
    this.message = new Message(this.inputDomManager);

    this.initListeners();
  }

  initListeners() {
    let validateOnEvents = this.inputDomManager.getValidateOnEvents();

    for(let i = 0; i < validateOnEvents.length; i++) {
      this.inputDomManager.registerListener(
        validateOnEvents[i],
        () => this.registerChain()
      );
    }
  }

  private registerChain() {
    Async.parallel(this.rules.extractCallbackChain()).subscribe(
      (responses: any[]) => {
        this.message.show(responses);
      }
    );
  }


}
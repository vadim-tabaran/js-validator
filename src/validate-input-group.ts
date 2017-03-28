import { ValidateInput } from "./validate-input";

export class ValidateInputGroup {
  private inputs: ValidateInput[] = [];

  constructor(inputs: HTMLInputElement[]) { // todo group by attribute ( customization )
    for(let i = 0; i < inputs.length; i++) {
      this.inputs.push(new ValidateInput(inputs[i], this)); // todo group without names
    }
  }

  each(callback) {
    for (let i = 0; i < this.inputs.length; i++) {
      callback(this.inputs[i]);
    }
  }

  length() {
    return this.inputs.length;
  }
}
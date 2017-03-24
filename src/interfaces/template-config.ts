import { InputDomManager } from "../dom-manager/input";

export interface TemplateConfig {
  validatorResponse: any,
  inputParameters: string[],
  inputDomManager: InputDomManager,
  rule: Rule
}
import {ValidateInputGroup} from "../validate-input-group";

export interface TemplateConfig {
  validatorResponse: any,
  inputParameters: string[],
  group: ValidateInputGroup,
  rule: Rule
}
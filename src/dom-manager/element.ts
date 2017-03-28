import {Validator} from "../validator";

export class ElementDomManager {
  static hasAttribute(element: Element, attrKey: string) {
    if (typeof element.hasAttribute !== 'function') {
      return false;
    }
    return element.hasAttribute(Validator.preFix + attrKey);
  }

  static getAttribute(element: Element, attrKey: string) {
    if (!ElementDomManager.hasAttribute(element, attrKey)) {
      return false;
    }
    return element.getAttribute(Validator.preFix + attrKey);
  }

  static getParentNode(element: Element) {
    return element.parentNode;
  }

  static hasParentNode(element: Element) {
    return !!element.parentNode;
  }
}
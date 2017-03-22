export class ErrorHandler{
  private errorMessages = {
    invalidSelector : "Can't find HTMLFormElement or HTMLInputElement on %selector% selector",
    invalidTarget : "Can't find HTMLFormElement or HTMLInputElement on %target% target",
    invalidErrorKey: "Invalid error key '%errorKey%'"
  };

  constructor(
    private key: string,
    private params
  ) { }

  static throw(key: string = '', params = {}) {
    new ErrorHandler(key, params);
  }

  private getMessage() {
    if (!(this.key in this.errorMessages)) {
      ErrorHandler.throw("invalidErrorKey");
      return '';
    }

    let currentMessage = this.errorMessages[this.key];
    for(let paramKey in this.params) {
      currentMessage = currentMessage.replace('%' + paramKey + '%', this.params[paramKey]);
    }

    return currentMessage;
  }
}
export class Message{
  constructor(
    private responses: any[],
    private element: HTMLInputElement
  ) {
    this.showMessage();
  }

  showMessage() {
    let messages = [];
    for(let i = 0; i < this.responses.length; i++) {
      messages.push(this.getMessage(this.responses[i]));
    }
  }

  private getMessage(response) {
    return '';
  }
}
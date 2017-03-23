export class Template {
  constructor(
    private message: string,
    private parameters: any
  ) {}

  extractMessage() {
    let params = this.parseParams();

    return 'This is extracted message';
  }

  private parseParams() {
    let unpreparedParameters = this.message.match(/%.*?%/g);


    return [];
  }
}
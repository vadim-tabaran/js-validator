import {Parallel} from "./parallel";

export class Async {
  static parallel(callbacks) {
    return new Parallel(callbacks);
  }
}
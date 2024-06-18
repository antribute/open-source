export class TypedResponse<T> extends Response {
  constructor(body: T) {
    super(body);
  }
}

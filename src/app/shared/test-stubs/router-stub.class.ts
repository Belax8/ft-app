
export class RouterStub {

  public url: string = '/client/list';

  navigateByUrl() {
      return true;
  }

  navigate() {
      return new Promise((pass, fail) => { pass(true); });
  }
}

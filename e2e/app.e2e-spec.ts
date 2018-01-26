import { FtAppPage } from './app.po';

describe('ft-app App', function() {
  let page: FtAppPage;

  beforeEach(() => {
    page = new FtAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

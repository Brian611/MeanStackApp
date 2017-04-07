import { MeanStackAppPage } from './app.po';

describe('mean-stack-app App', () => {
  let page: MeanStackAppPage;

  beforeEach(() => {
    page = new MeanStackAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

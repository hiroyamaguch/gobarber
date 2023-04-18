import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeEmailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Email Fake';
  }
}

export default FakeEmailTemplateProvider;

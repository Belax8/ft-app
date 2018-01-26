/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { TitleCasePipe } from './title-case.pipe';

let pipe: TitleCasePipe;

describe('Pipe: TitleCase', () => {

  beforeEach(() => {
    pipe = new TitleCasePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it(`create title case 'test'`, () => {
    let result = pipe.transform('test');
    expect(result).toEqual('Test');
  });

  it(`create title case 'test multiple words'`, () => {
    let result = pipe.transform('test multiple words');
    expect(result).toEqual('Test Multiple Words');
  });

  it(`create title case when null`, () => {
    let result = pipe.transform(null);
    expect(result).toEqual('');
  });

});

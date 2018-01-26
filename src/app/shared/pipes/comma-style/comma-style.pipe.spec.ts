/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';

import { CommaStylePipe } from './comma-style.pipe';

let pipe: CommaStylePipe;

describe('Pipe: CommaStyle', () => {

  beforeEach(() => {
    pipe = new CommaStylePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it(`should work`, () => {
    let result = pipe.transform(2345);
    expect(result).toEqual('2,345');
  });

  it(`should work with 0`, () => {
    let result = pipe.transform(0);
    expect(result).toEqual('0');
  });

  it(`should work with null`, () => {
    let result = pipe.transform(null);
    expect(result).toEqual('');
  });

});

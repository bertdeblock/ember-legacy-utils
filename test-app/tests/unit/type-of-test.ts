import EmberObject from '@ember/object';
import { typeOf } from '@ember/legacy-utils';
import { module, test } from 'qunit';

module('Unit | typeOf', function () {
  test('it works', function (assert) {
    class MockedDate extends Date {}

    const mockedDate = new MockedDate();
    const date = new Date();
    const error = new Error('boum');
    const object = { a: 'b' };
    const a = null;
    const arr = [1, 2, 3];
    const obj = {};
    // eslint-disable-next-line ember/no-classic-classes
    const instance = EmberObject.extend({
      method() {},
      async asyncMethod() {},
    }).create();

    // @ts-expect-error: Testing with no params.
    assert.strictEqual(typeOf(), 'undefined', 'undefined');
    assert.strictEqual(typeOf(null), 'null', 'null');
    assert.strictEqual(typeOf('Cyril'), 'string', 'Cyril');
    assert.strictEqual(typeOf(101), 'number', '101');
    assert.strictEqual(typeOf(true), 'boolean', 'true');
    assert.strictEqual(typeOf([1, 2, 90]), 'array', '[1,2,90]');
    assert.strictEqual(typeOf(/abc/), 'regexp', '/abc/');
    assert.strictEqual(typeOf(date), 'date', 'new Date()');
    assert.strictEqual(typeOf(mockedDate), 'date', 'mocked date');
    assert.strictEqual(typeOf(error), 'error', 'error');
    assert.strictEqual(typeOf(object), 'object', 'object');
    assert.strictEqual(
      typeOf(undefined),
      'undefined',
      'item of type undefined',
    );
    assert.strictEqual(typeOf(a), 'null', 'item of type null');
    assert.strictEqual(typeOf(arr), 'array', 'item of type array');
    assert.strictEqual(typeOf(obj), 'object', 'item of type object');
    assert.strictEqual(typeOf(instance), 'instance', 'item of type instance');
    assert.strictEqual(
      // @ts-expect-error: Type issue with `EmberObject`:
      typeOf(instance.method),
      'function',
      'item of type function',
    );
    assert.strictEqual(
      // @ts-expect-error: Type issue with `EmberObject`:
      typeOf(instance.asyncMethod),
      'function',
      'item of type async function',
    );
    assert.strictEqual(
      // eslint-disable-next-line ember/no-classic-classes
      typeOf(EmberObject.extend()),
      'class',
      'item of type class',
    );
    assert.strictEqual(typeOf(new Error()), 'error', 'item of type error');
  });

  test('typeOf(fileList)', function (assert) {
    const fileListElement = document.createElement('input');

    fileListElement.type = 'file';

    assert.strictEqual(
      typeOf(fileListElement.files),
      'filelist',
      'item of type filelist',
    );
  });
});

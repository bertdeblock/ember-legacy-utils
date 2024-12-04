import ObjectProxy from '@ember/object/proxy';
import { isEmpty } from '@ember/legacy-utils';
import { module, test } from 'qunit';

module('Unit | isEmpty', function () {
  test('it works', function (assert) {
    const string = 'string';
    const fn = function () {};
    const object = { length: 0 };
    const proxy = ObjectProxy.create({ content: { size: 0 } });

    assert.true(isEmpty(null), 'for null');
    assert.true(isEmpty(undefined), 'for undefined');
    assert.true(isEmpty(''), 'for an empty String');
    assert.false(isEmpty('  '), 'for a whitespace String');
    assert.false(isEmpty('\n\t'), 'for another whitespace String');
    assert.false(isEmpty(true), 'for true');
    assert.false(isEmpty(false), 'for false');
    assert.false(isEmpty(string), 'for a String');
    assert.false(isEmpty(fn), 'for a Function');
    assert.false(isEmpty(0), 'for 0');
    assert.true(isEmpty([]), 'for an empty Array');
    assert.false(isEmpty({}), 'for an empty Object');
    assert.true(isEmpty(object), "for an Object that has zero 'length'");
    assert.true(isEmpty(proxy), "for a proxy that has zero 'size'");
  });
});

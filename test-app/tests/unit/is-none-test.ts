import { isNone } from '@ember/legacy-utils';
import { module, test } from 'qunit';

module('Unit | isNone', function () {
  test('it works', function (assert) {
    const string = 'string';
    const fn = function () {};

    assert.true(isNone(null), 'for null');
    assert.true(isNone(undefined), 'for undefined');
    assert.false(isNone(''), 'for an empty String');
    assert.false(isNone(true), 'for true');
    assert.false(isNone(false), 'for false');
    assert.false(isNone(string), 'for a String');
    assert.false(isNone(fn), 'for a Function');
    assert.false(isNone(0), 'for 0');
    assert.false(isNone([]), 'for an empty Array');
    assert.false(isNone({}), 'for an empty Object');
  });
});

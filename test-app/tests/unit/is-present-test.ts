import { isPresent } from '@ember/legacy-utils';
import { module, test } from 'qunit';

module('Unit | isPresent', function () {
  test('it works', function (assert) {
    const string = 'string';
    const fn = function () {};
    const object = { length: 0 };

    // @ts-expect-error: Testing with no params.
    assert.false(isPresent(), 'for no params');
    assert.false(isPresent(null), 'for null');
    assert.false(isPresent(undefined), 'for undefined');
    assert.false(isPresent(''), 'for an empty String');
    assert.false(isPresent('  '), 'for a whitespace String');
    assert.false(isPresent('\n\t'), 'for another whitespace String');
    assert.true(isPresent('\n\t Hi'), 'for a String with whitespaces');
    assert.true(isPresent(true), 'for true');
    assert.true(isPresent(false), 'for false');
    assert.true(isPresent(string), 'for a String');
    assert.true(isPresent(fn), 'for a Function');
    assert.true(isPresent(0), 'for 0');
    assert.false(isPresent([]), 'for an empty Array');
    assert.true(isPresent({}), 'for an empty Object');
    assert.false(isPresent(object), "for an Object that has zero 'length'");
    assert.true(isPresent([1, 2, 3]), 'for a non-empty array');
  });
});

import { isBlank } from '@ember/legacy-utils';
import { module, test } from 'qunit';

module('Unit | isBlank', function () {
  test('it works', function (assert) {
    const string = 'string';
    const fn = function () {};
    const object = { length: 0 };

    assert.true(isBlank(null), 'for null');
    assert.true(isBlank(undefined), 'for undefined');
    assert.true(isBlank(''), 'for an empty String');
    assert.true(isBlank('  '), 'for a whitespace String');
    assert.true(isBlank('\n\t'), 'for another whitespace String');
    assert.false(isBlank('\n\t Hi'), 'for a String with whitespaces');
    assert.false(isBlank(true), 'for true');
    assert.false(isBlank(false), 'for false');
    assert.false(isBlank(string), 'for a String');
    assert.false(isBlank(fn), 'for a Function');
    assert.false(isBlank(0), 'for 0');
    assert.true(isBlank([]), 'for an empty Array');
    assert.false(isBlank({}), 'for an empty Object');
    assert.true(isBlank(object), "for an Object that has zero 'length'");
    assert.false(isBlank([1, 2, 3]), 'for a non-empty array');
  });
});

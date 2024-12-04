import { Comparable } from '@ember/-internals/runtime';
import EmberObject from '@ember/object';
import { compare, typeOf } from '@ember/legacy-utils';
import { module, test } from 'qunit';

const data: unknown[] = [];
const Comp = EmberObject.extend(Comparable);

Comp.reopenClass({
  compare(obj: EmberObject) {
    return obj.get('val');
  },
});

module('Unit | compare', function (hooks) {
  hooks.beforeEach(function () {
    data[0] = null;
    data[1] = false;
    data[2] = true;
    data[3] = -12;
    data[4] = 3.5;
    data[5] = 'a string';
    data[6] = 'another string';
    data[7] = 'last string';
    data[8] = [1, 2];
    data[9] = [1, 2, 3];
    data[10] = [1, 3];
    data[11] = { a: 'hash' };
    data[12] = EmberObject.create();
    data[13] = function (a: unknown) {
      return a;
    };
    data[14] = new Date('2012/01/01');
    data[15] = new Date('2012/06/06');
  });

  test('ordering works', function (assert) {
    let suspect, comparable, failureMessage, suspectIndex, comparableIndex;

    for (suspectIndex = 0; suspectIndex < data.length; suspectIndex++) {
      suspect = data[suspectIndex];

      assert.strictEqual(
        compare(suspect, suspect),
        0,
        suspectIndex + ' should equal itself',
      );

      for (
        comparableIndex = suspectIndex + 1;
        comparableIndex < data.length;
        comparableIndex++
      ) {
        comparable = data[comparableIndex];

        failureMessage =
          'data[' +
          suspectIndex +
          '] (' +
          typeOf(suspect) +
          ') should be smaller than data[' +
          comparableIndex +
          '] (' +
          typeOf(comparable) +
          ')';

        assert.strictEqual(compare(suspect, comparable), -1, failureMessage);
      }
    }
  });

  test('comparables return values in the range of -1, 0, 1', function (assert) {
    const negOne = Comp.create({
      // @ts-expect-error: `val` does not exist in type:
      val: -1,
    });

    const zero = Comp.create({
      // @ts-expect-error: `val` does not exist in type:
      val: 0,
    });

    const one = Comp.create({
      // @ts-expect-error: `val` does not exist in type:
      val: 1,
    });

    assert.strictEqual(
      // @ts-expect-error: Testing with different types:
      compare(negOne, 'a'),
      -1,
      'First item comparable - returns -1 (not negated)',
    );
    assert.strictEqual(
      // @ts-expect-error: Testing with different types:
      compare(zero, 'b'),
      0,
      'First item comparable - returns  0 (not negated)',
    );
    assert.strictEqual(
      // @ts-expect-error: Testing with different types:
      compare(one, 'c'),
      1,
      'First item comparable - returns  1 (not negated)',
    );

    assert.strictEqual(
      // @ts-expect-error: Testing with different types:
      compare('a', negOne),
      1,
      'Second item comparable - returns -1 (negated)',
    );
    assert.strictEqual(
      // @ts-expect-error: Testing with different types:
      compare('b', zero),
      0,
      'Second item comparable - returns  0 (negated)',
    );
    assert.strictEqual(
      // @ts-expect-error: Testing with different types:
      compare('c', one),
      -1,
      'Second item comparable - returns  1 (negated)',
    );
  });
});

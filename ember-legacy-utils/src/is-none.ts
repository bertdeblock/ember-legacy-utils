/**
 @module @ember/legacy-utils
*/
/**
  Returns true if the passed value is null or undefined. This avoids errors
  from JSLint complaining about use of ==, which can be technically
  confusing.

  ```javascript
  isNone(null);          // true
  isNone(undefined);     // true
  isNone('');            // false
  isNone([]);            // false
  isNone(function() {}); // false
  ```

  @method isNone
  @static
  @for @ember/legacy-utils
  @param {Object} obj Value to test
  @return {Boolean}
  @public
*/
export default function isNone(obj: unknown): obj is null | undefined {
  return obj === null || obj === undefined;
}

import isBlank from './is-blank.ts';
/**
 @module @ember/legacy-utils
*/
/**
  A value is present if it not `isBlank`.

  ```javascript
  isPresent(null);            // false
  isPresent(undefined);       // false
  isPresent('');              // false
  isPresent('  ');            // false
  isPresent('\n\t');          // false
  isPresent([]);              // false
  isPresent({ length: 0 });   // false
  isPresent(false);           // true
  isPresent(true);            // true
  isPresent('string');        // true
  isPresent(0);               // true
  isPresent(function() {});   // true
  isPresent({});              // true
  isPresent('\n\t Hello');    // true
  isPresent([1, 2, 3]);       // true
  ```

  @method isPresent
  @static
  @for @ember/legacy-utils
  @param {Object} obj Value to test
  @return {Boolean}
  @since 1.8.0
  @public
*/
export default function isPresent<T>(obj: T | null | undefined): obj is T {
  return !isBlank(obj);
}

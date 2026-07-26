import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const styles = readFileSync(
  new URL('../src/components/DotField.css', import.meta.url),
  'utf8',
);

test('the hero DotField overrides the component positioning rule', () => {
  assert.match(
    styles,
    /\.dot-field-container\.hero-dot-field\s*\{[^}]*position:\s*absolute;[^}]*inset:\s*0;/s,
  );
});

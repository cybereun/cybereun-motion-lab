import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const styles = readFileSync(
  new URL('../src/components/DotField.css', import.meta.url),
  'utf8',
);
const componentSource = readFileSync(
  new URL('../src/components/DotField.tsx', import.meta.url),
  'utf8',
);

test('the hero DotField overrides the component positioning rule', () => {
  assert.match(
    styles,
    /\.dot-field-container\.hero-dot-field\s*\{[^}]*position:\s*absolute;[^}]*inset:\s*0;/s,
  );
});

test('the DotField tracks pointer movement above sibling content layers', () => {
  assert.match(
    componentSource,
    /window\.addEventListener\('pointermove', onPointerMove/,
  );
  assert.match(
    componentSource,
    /window\.removeEventListener\('pointermove', onPointerMove/,
  );
});

test('reduced-motion mode keeps user-directed pointer feedback', () => {
  assert.match(
    componentSource,
    /const targetEngagement = Math\.min\(mouse\.speed \/ 5, 1\);/,
  );
  assert.match(componentSource, /sparkle && !reducedMotion/);
  assert.doesNotMatch(
    componentSource,
    /if \(!reducedMotion \|\| frameCount === 1\)/,
  );
});

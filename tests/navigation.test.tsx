import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';

test('the header links the Threads icon to @gogo_lebi', () => {
  const html = renderToStaticMarkup(<App />);

  assert.match(html, /href="https:\/\/www\.threads\.com\/@gogo_lebi"/);
  assert.match(html, /aria-label="Visit @gogo_lebi on Threads"/);
});

test('the home hero includes the interactive DotField background', () => {
  const html = renderToStaticMarkup(<App />);

  assert.match(html, /data-testid="hero-dot-field"/);
  assert.match(html, /aria-label="Interactive dot field background"/);
});

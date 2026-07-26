import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';

test('the header links the Threads icon to @gogo_lebi', () => {
  const html = renderToStaticMarkup(<App initiallyEntered />);

  assert.match(html, /href="https:\/\/www\.threads\.com\/@gogo_lebi"/);
  assert.match(html, /aria-label="Visit @gogo_lebi on Threads"/);
});

test('the intro explains the product before entering the library', () => {
  const html = renderToStaticMarkup(<App />);

  assert.match(html, /Welcome to Cybereun Motion Lab/);
  assert.match(html, /Enter Motion Lab/);
  assert.match(html, /A living library of React micro-interactions/);
  assert.match(html, /data-testid="hero-dot-field"/);
  assert.match(html, /aria-label="Interactive dot field background"/);
  assert.match(html, /hero-dot-field/);
});

test('the entered experience renders the Kinetic Atlas workspace', () => {
  const html = renderToStaticMarkup(<App initiallyEntered />);

  assert.match(html, /aria-label="Kinetic Atlas workspace"/);
  assert.match(html, /aria-label="Component categories"/);
  assert.match(html, /aria-label="Inspector panel"/);
  assert.match(html, /aria-label="Component filmstrip"/);
  assert.match(html, /001<\/strong><span>\/ 035/);
  assert.doesNotMatch(html, /Interfaces that move/);
});

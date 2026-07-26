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

test('the entered home hero keeps the interactive DotField background', () => {
  const html = renderToStaticMarkup(<App initiallyEntered />);

  assert.match(html, /data-testid="hero-dot-field"/);
  assert.match(html, /Interfaces that move/);
});

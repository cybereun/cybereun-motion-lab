import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
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

test('the entered experience renders the Motion Gallery Studio', () => {
  const html = renderToStaticMarkup(<App initiallyEntered />);

  assert.match(html, /aria-label="Motion Gallery Studio"/);
  assert.match(html, /aria-label="Component categories"/);
  assert.match(html, /aria-label="Component browser"/);
  assert.match(html, /aria-label="Collection summary"/);
  assert.match(html, /Search 178 motions/);
  assert.match(html, /Download for Mac/);
  assert.doesNotMatch(html, /aria-label="Inspector panel"/);
  assert.doesNotMatch(html, /aria-label="Component filmstrip"/);
  assert.doesNotMatch(html, /Interfaces that move/);
});

test('opening controls reallocates workspace width without blurring the preview', () => {
  const css = readFileSync(
    new URL('../src/components/MotionWorkspace.css', import.meta.url),
    'utf8',
  );

  assert.match(css, /\.gallery\.has-controls \.gallery-body\s*{[^}]*margin-right:/s);
  assert.match(css, /\.controls-drawer\s*{[^}]*top: 76px;[^}]*bottom: 110px;/s);
  assert.doesNotMatch(css, /\.controls-backdrop/);
  assert.doesNotMatch(css, /backdrop-filter:\s*blur\(5px\)/);
});

test('browser pagination centers both arrows around a fixed-width counter', () => {
  const css = readFileSync(
    new URL('../src/components/MotionWorkspace.css', import.meta.url),
    'utf8',
  );

  assert.match(css, /\.browser-pagination\s*{[^}]*grid-template-columns: 30px 44px 30px;/s);
  assert.match(css, /\.browser-pagination button\s*{[^}]*place-items: center;/s);
  assert.match(css, /\.browser-pagination span\s*{[^}]*text-align: center;/s);
});

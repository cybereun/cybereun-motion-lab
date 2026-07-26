import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AnimatedButton } from '../src/components/AnimatedButton';
import { FocusBlur } from '../src/components/cards/FocusBlur';
import { buttonsData } from '../src/data/buttons';

test('items without a destination render as buttons and cannot navigate to the page top', () => {
  const html = renderToStaticMarkup(
    <FocusBlur items={[{ label: '@GitHub' }]} />,
  );

  assert.match(html, /<button[^>]*type="button"/);
  assert.doesNotMatch(html, /href="#"/);
});

test('items with a real destination remain links', () => {
  const html = renderToStaticMarkup(
    <FocusBlur items={[{ label: '@GitHub', href: 'https://github.com/cybereun' }]} />,
  );

  assert.match(html, /<a[^>]*href="https:\/\/github\.com\/cybereun"/);
});

test('the Focus Blur Links catalog preview contains no placeholder navigation', () => {
  const config = buttonsData.find((button) => button.interactionType === 'focus-blur');
  assert.ok(config);

  const html = renderToStaticMarkup(
    <AnimatedButton config={config} layoutMode="grid" theme="dark" />,
  );

  assert.doesNotMatch(html, /href="#"/);
  assert.doesNotMatch(html, /@X/);
  assert.match(html, /href="https:\/\/www\.threads\.com\/@gogo_lebi"/);
  assert.match(html, /href="https:\/\/github\.com\/cybereun\/cybereun-motion-lab"/);
});

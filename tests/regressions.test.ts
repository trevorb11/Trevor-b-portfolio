import assert from 'node:assert/strict';
import { test } from 'node:test';
import { contactFormSchema } from '../shared/schema';
import { extractVideoId, generateHTMLContent, isWebUrl } from '../client/src/lib/youtube-redirect';

const videoId = 'TUVw5t0TC18';

test('YouTube URLs require an exact supported host and valid video ID', () => {
  for (const url of [
    `https://www.youtube.com/watch?feature=share&v=${videoId}`,
    `https://youtu.be/${videoId}?t=12`,
    `https://www.youtube.com/shorts/${videoId}`,
    `https://www.youtube-nocookie.com/embed/${videoId}`,
  ]) assert.equal(extractVideoId(url), videoId);
  for (const url of [
    `https://youtube.com.example.org/watch?v=${videoId}`,
    `https://example.org/youtube.com/watch?v=${videoId}`,
    'https://youtu.be/not-an-id', 'not a URL',
  ]) assert.equal(extractVideoId(url), null);
});

test('Generated HTML preserves destination quotes without allowing a closing script tag', () => {
  const target = 'https://example.org/?q="</script><script>alert(1)</script>&x=1';
  const html = generateHTMLContent(videoId, target, 32);
  assert.equal((html.match(/<script>/g) || []).length, 1);
  assert.ok(!html.includes('<script>alert(1)'));
  const literal = html.match(/const TARGET_URL = (.*);/)?.[1];
  assert.equal(JSON.parse(literal!), target);
});

test('Redirect generator rejects unsafe protocols and invalid times', () => {
  assert.equal(isWebUrl('javascript:alert(1)'), false);
  assert.equal(isWebUrl('data:text/html,test'), false);
  assert.throws(() => generateHTMLContent(videoId, 'javascript:alert(1)', 1));
  assert.throws(() => generateHTMLContent(videoId, 'https://example.org', NaN));
  assert.throws(() => generateHTMLContent(videoId, 'https://example.org', -1));
});

test('Contact validation rejects whitespace-only fields and oversized messages', () => {
  const data = { name: 'Test User', email: 'test@example.invalid', subject: 'Audit test', message: 'This is a validation test.' };
  assert.equal(contactFormSchema.parse(data).marketingConsent, false);
  assert.equal(contactFormSchema.safeParse({ ...data, message: ' '.repeat(20) }).success, false);
  assert.equal(contactFormSchema.safeParse({ ...data, message: 'a'.repeat(10001) }).success, false);
});


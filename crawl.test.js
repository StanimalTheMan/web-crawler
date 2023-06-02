const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

test('normalizes https://wagslane.dev/path/ to equal wagslane.dev/path', () => {
  expect(normalizeURL('https://wagslane.dev/path/')).toBe('wagslane.dev/path')
})

test('normalizes https://wagsLane.Dev/path to equal wagslane.dev/path', () => {
  expect(normalizeURL('https://wagsLane.Dev/path')).toBe('wagslane.dev/path')
})

test('normalizes https://wagslane.dev/path to equal wagslane.dev/path', () => {
  expect(normalizeURL('https://wagslane.dev/path')).toBe('wagslane.dev/path')
})

test('normalizes http://wagslane.dev/path to equal wagslane.dev/path', () => {
  expect(normalizeURL('http://wagslane.dev/path')).toBe('wagslane.dev/path')
})

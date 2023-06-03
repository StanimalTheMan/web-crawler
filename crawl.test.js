const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

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

test('getURLsFromHTML absolute url', () => {
  const baseURL = 'https://blog.boot.dev'
  const htmlBody = '<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>'
  const actual = getURLsFromHTML(htmlBody, baseURL)
  const expected = ['https://blog.boot.dev/']
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative url', () => {
  const baseURL = 'https://blog.boot.dev'
  const htmlBody = '<html><body><a href="/path"><span>Go to Boot.dev</span></a></body></html>'
  const actual = getURLsFromHTML(htmlBody, baseURL)
  const expected = ['https://blog.boot.dev/path']
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML both absolute and relative urls in anchor tags', () => {
  const baseURL = 'https://blog.boot.dev'
  const htmlBody = '<html><body><a href="/path"><span>Go to Boot.dev</span></a><a href="https://absolute.com/path"><span>Go to Boot.dev</span></a></body></html>'
  const actual = getURLsFromHTML(htmlBody, baseURL)
  const expected = ['https://blog.boot.dev/path', 'https://absolute.com/path']
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML handle error', () => {
  const baseURL = 'https://blog.boot.dev'
  const htmlBody = '<html><body><a href="path"><span>Go to Boot.dev</span></a></body></html>'
  const actual = getURLsFromHTML(htmlBody, baseURL)
  const expected = []
  expect(actual).toEqual(expected)
})

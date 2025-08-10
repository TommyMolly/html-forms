/**
 * @jest-environment jsdom
 */

const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Popover widget DOM interaction', () => {
  let document;
  let window;

  beforeEach(() => {
    const html = fs.readFileSync(path.resolve(__dirname, '../../dist/index.html'), 'utf8');
    const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });

    document = dom.window.document;
    window = dom.window;

    const scriptContent = fs.readFileSync(path.resolve(__dirname, '../../dist/bundle.js'), 'utf8');
    window.eval(scriptContent);
  });

  test('creates popover on click', () => {
    const button = document.querySelector('#popoverBtn');
    button.click();
    const popover = document.querySelector('.popover');
    expect(popover).not.toBeNull();
  });

  test('removes popover on outside click', () => {
    const button = document.querySelector('#popoverBtn');
    button.click();
    document.body.click();
    const popover = document.querySelector('.popover');
    expect(popover).toBeNull();
  });
});

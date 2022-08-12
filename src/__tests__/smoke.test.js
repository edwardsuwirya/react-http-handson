// create-react-app use Jest as Test Runner
// File name convention
// 1. file with .js suffix in __tests__folder
// 2. file with .test.js suffix

// full path, single test
// npm test src/__tests__/smoke.test.js

// using regex
// npm test smoke (regex)

// using name in describe
// npm test -- -t 'describe-name'

// without watch, create new script in package json
// "test:nw":"react-scripts test --watchAll=false"

// Coverage
// npm test -- --coverage

test('Smoke test', () => {
    expect(true).toBeTruthy();
})
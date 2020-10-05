const input = require("../client/js/validateInputs");

describe('Test validateInputs functionality', () => {
    test('Testing the validateInputs() function', () => {
        expect(input.validateInputs("2020-08-20", "2020-08-25","London")).toBe(true);
        expect(input.validateInputs("2020-08-20", "2020-08-25","505")).toBe(false);

    });
});


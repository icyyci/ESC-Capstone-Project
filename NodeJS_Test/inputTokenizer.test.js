const utils = require('../config/utils.js');

test("Converts the dimension given into an array of String with int value", () => {
    var result = utils.inputTokenizer("40x35");
    expect(result[0]).toBe("40");
    expect(result[1]).toBe("35");
})

test("See if it can handle decimals", () => {
    var result = utils.inputTokenizer("40.45x300.393");
    expect(result[0]).toBe("40.45");
    expect(result[1]).toBe("300.393");
})

test("Test if it handles a missing \"x\" correctly" , () => {
    var result = utils.inputTokenizer("40,40");
    expect(result).toBe("40,40");
})

test("Test if it handles multiple \"x's\" correctly", () => {
    var result = utils.inputTokenizer("40xxxx40");
    expect(result).toBe("40xxxx40");
})


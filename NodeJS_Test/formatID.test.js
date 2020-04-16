const utils = require("../config/utils.js");

test("Converts other format of representing the groups into a universal id", () => {
    result = utils.idFormat("Group 20");
    expect(result).toBe("group20");
})

test("Test if it handles fuzzed inputs correctly", () => {
    result = utils.idFormat("hhU$@)@%AJNAFN2$*%");
    expect(result).toBe("hhu$@)@%ajnafn2$*%");
})

test("Test if it handes multiple spaces correctly", ()=> {
    result = utils.idFormat("Group     20");
    expect(result).toBe("group20");
})
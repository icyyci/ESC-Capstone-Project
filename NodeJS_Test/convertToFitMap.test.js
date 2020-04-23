const utils = require("../config/utils.js");

test("Converts the size in metres from the user request and converts it to size in pixels for display on the map", () => {
    result = utils.convertToFitMap([4,4])
    expect(result).toStrictEqual([45.52988, 45.52988]);
})

test("Test if it handles decimal places correctly", () => {
    result = utils.convertToFitMap([4.5,2.8])
    expect(result).toStrictEqual([51.221115, 31.870916]);
})

test("Test if an input of 0 is handled correctly", () => {
    result = utils.convertToFitMap([0,0]);
    expect(result).toStrictEqual([0,0]);
})

test("Test if it handles no inputs correctly in the event there is no data to retrieve", ()=> {
    result = utils.convertToFitMap();
    expect(result).toStrictEqual([0,0]);
})

test("Test if it handles an array with incorrect number of elements (lower)", () => {
    result = utils.convertToFitMap([1]);
    expect(result).toStrictEqual([0,0]);
    result = utils.convertToFitMap([1,1,1,1]);
    expect(result).toStrictEqual([0,0]);
})

test("Test if it handles an array with incorrect number of elements (higher)", () => {
    result = utils.convertToFitMap([1,1,1,1]);
    expect(result).toStrictEqual([0,0]);
})

test("Test if it handles negative numbers correctly", () => {
    result = utils.convertToFitMap([-2,-5]);
    expect(result).toStrictEqual([22.76494, 56.91235])
})

test("Test if it handles negative numbers correctly", () => {
    result = utils.convertToFitMap([-10, 8])
    expect(result).toStrictEqual([113.8247, 91.05976])
})
test("Test if it handles negative numbers correctly", () => {
    result = utils.convertToFitMap([3, -11])
    expect(result).toStrictEqual([34.14741, 125.20717])
})
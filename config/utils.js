inputTokenizer = (inpString) => {
    var xcount =0;
    for (var i = 0; i < inpString.length; i++) {
        if(inpString.charAt(i) == "x") {
            xcount++;
        }
    }
    if (xcount != 1) {
        return inpString;
    }
    var tempString = inpString
    var splitString = tempString.split("x");
    var result = [splitString[0], splitString[1]];
    return result;
}

idFormat = (inpString) => {
    var result = inpString
    try {
       result = inpString.split(" ").join('').toLowerCase(); 
    } catch (error) { 
    }
    return result;
}

convertToFitMap = (inpArray) => {
    try {
        if( inpArray.length != 2) {
            return [0,0];
        }
        var result = []
        var firstInput = inpArray[0];
        var secondInput = inpArray[1];
        var firstOutput = Math.abs(firstInput * 11.38247)
        var secondOuput = Math.abs(secondInput * 11.38247)
        firstOutput = parseFloat(firstOutput.toFixed(6))
        secondOuput = parseFloat(secondOuput.toFixed(6))
        result.push(firstOutput);
        result.push(secondOuput);
    }
    catch(error) {
        result = [0,0]
    }

    return result;
}

module.exports.inputTokenizer = inputTokenizer;
module.exports.idFormat = idFormat;
module.exports.convertToFitMap = convertToFitMap;

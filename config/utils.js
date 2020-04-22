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
    if( inpArray.length != 2) {
        return [0,0];
    }
    var result = []
    firstInput = inpArray[0];
    secondInput = inpArray[1];
    result.push(firstInput * 11.38247);
    result.push(secondInput * 11.38247);
    return result;
}

module.exports.inputTokenizer = inputTokenizer;
module.exports.idFormat = idFormat;
module.exports.convertToFitMap = convertToFitMap;

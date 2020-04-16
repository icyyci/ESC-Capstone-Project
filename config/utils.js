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

module.exports.inputTokenizer = inputTokenizer;
module.exports.idFormat = idFormat;

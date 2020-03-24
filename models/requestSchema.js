const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema( {

    groupNumber: {
        type: String,
        required: true
    },

    groupRequest: {
        typeOfPrototype: {
            type: String
        },
        
        showcaseSpaceNeeded: {
            type: String
        },

        dimensionOfPrototype: {
            type: String
        },
        
        noOfPowerPoints: {
            type: String
        },
        
        pedestals: {
            type: String
        },
    
        otherRequests: {
            type: String
        }
    }  
})
    
const request = mongoose.model('requestSchema', requestSchema);
module.exports = request;

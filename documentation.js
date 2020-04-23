
const serverMethods = [

    {
        name: "http.listen",
        type: "connection",
        parameter1: {
            value: "port number",
            type: Number,
            optional: false
        },
        returnValue: null,
        description: "Connects the server to the port number provided"
    } ,
    {
        name: "server.get",
        type: "HTTP Request",
        parameter1: {
            value: "path",
            type: String,
            optional: false
        },
        returnValue: null,
        description: "Handles any get request to the URL path specified in the first parameter"
    },
    {
        name: "sendFile",
        type: "HTTP Post",
        parameter1: {
            value: "path",
            type: String,
            optional: false
        },
        returnValue: null,
        description: "Sends the file located at the path given to the client"
    } 
]

const passportMethods = [
    {
        name: "serializeUser",
        type: "authentication",
        parameter1: {
            value: "user ID ",
            type: String,
            optional: false
        },
        returnValue: null,
        description: "Register the userID as signed in for the specific session"
    },
    {
        name: " deserializeUser",
        type: "authentication",
        parameter1: {
            value: "user ID",
            type: String,
            optional: false
        },
        returnValue: null,
        description: "Unregister the userID from the current session"
    },
    {
        name: "ensureAuthenticated ",
        type: "authentication",
        parameter1: {
            value: "user ID",
            type: String,
            optional: false
        },
        returnValue: null,
        description: "Checks if the given userID isAuthenticated, if it is not, redirect it to the homepage "
    } ,
    {
        name: "isAuthenticated",
        type: "authentication",
        parameter1: {
            value: "user ID",
            type: String,
            optional: false
        },
        returnValue: Boolean,
        description: "Checks if the user ID given is signed in for the current session, if it is not return false, else true"
    },
    {
        name: "authenticate",
        type: "authentication",
        parameter1: {
            value: "Strategy",
            type: String,
            optional: false
        },
        returnValue: null,
        description: "Authenticate the user based on the strategy provided"
    } 
]

const utilsMethods = [
    {
        name: "inputTokenizer",
        type: "Utility Method",
        parameter1: {
            value: "String to be tokenize",
            type: String,
            optional: false
        },
        returnValue: Array,
        description: "Takes in a String containing the dimension of space requested and return an array containing the dimension values"
    },
    {
        name: "idFormat",
        type: "Utility Method",
        parameter1: {
            value: "ID to conver",
            type: String,
            optional: false 
        },
        returnValue: String,
        description: "Converts the ID string given into one that matches the ID stored at the database and returns it "
    },
    {
        name: "convertToFitMap",
        type: "Utility Method",
        parameter1: {
            value: "Array of the two dimension values",
            type: Array ,
            optional: false
        },
        returnValue: Array,
        description: "Converts the dimension values given in metres to a value that fits the scale of the map"
    } 
]

const adminMethods = [
    {
        name: "router.get",
        type: "HTTP Request",
        parameter1: {
            value: "path",
            type: String,
            optional: false 
        },
        returnValue: null,
        description: "Handles any Admin specific request to the URL path specified in the first parameter"
    },
    {
        name: "router.post",
        type: "HTTP Post ",
        parameter1: {
            value: "path",
            type: String,
            optional: false
        },
        paramerter2: {
            value: "type of request and other parameters specific to the request",
            type: JSON,
            optional: false
        },
        returnValue: null,
        description: "Handles any Admin specific post request on the URL path specified according to the type of request given in the second parameter",
        typeOfRequests: [
            {
                name: "data",
                otherParameters: ["groupID"],
                description: "Fetches the request data belonging to the groupID from the database and sends the request data to the client"

            },
            {
                name: "firstload",
                otherParameters: null,
                description: "Fetches the list of groups from database and sends it to the client"
            },
            {
                name: "announcement",
                otherParameters: ["groupID", "msg"],
                description: "Posts the announcement given in msg to either the group specified in groupID or to all the groups"
            },
            {
                name: "unregister",
                otherParameters: ["groupID"],
                description: "Unregister the groupID by finding all data belonging to it in the database and removing them"
            },
            {
                name: "register",
                otherParameters: ["groupNo", "groupID", "groupPassword"],
                description: "Register the group to the database according to the details given"
            }

        ]

    } 

]

const userMethods = [
    {
        name: "router.get",
        type: "HTTP Request",
        parameter1: {
            value: "path",
            type: String,
            optional: false 
        },
        returnValue: null,
        description: "Handles any User specific request to the URL path specified in the first parameter"
    },
    {
        name: "router.post",
        type: "HTTP Post ",
        parameter1: {
            value: "path",
            type: String,
            optional: false
        },
        paramerter2: {
            value: "type of request and other parameters specific to the request",
            type: JSON,
            optional: false
        },
        returnValue: null,
        description: "Handles any User specific post request on the URL path specified according to the type of request given in the second parameter",
        typeOfRequests: [
            {
                name: "firstload",
                otherParameters: ["groupID"],
                description: "Fetches the request data belonging to the groupID from the database and sends it to the client"
            },
            {
                name: "announcements",
                otherParameters: ["groupID"],
                description: "Fetches all the announcements belonging to the groupID from the database and sends it to the client"
            },
            {
                name: "Data",
                otherParameters: ["groupID","typeOfPrototype, showcaseSpaceNeeded, sizeOfPrototype, noOfPowerPoints, pedestals, otherRequests "],
                description: "Stores the request submitted by the group onto the database"
            }

        ]
    }
]

const mapMethods = [
    {
        name: "router.get",
        type: "HTTP Request",
        parameter1: {
            value: "path",
            type: String,
            optional: false 
        },
        returnValue: null,
        description: "Handles any Mapping specific request to the URL path specified in the first parameter"
    },
    {
        name: "router.post",
        type: "HTTP Post ",
        parameter1: {
            value: "path",
            type: String,
            optional: false
        },
        paramerter2: {
            value: "type of request and other parameters specific to the request",
            type: JSON,
            optional: false
        },
        returnValue: null,
        description: "Handles any Mapping specific post request on the URL path specified according to the type of request given in the second parameter",
        typeOfRequests: [
            {
                name: "firstload",
                otherParameters: null,
                description: "Retrieves the list of groups from the database and sends it to the client"
            },
            {
                name: "data",
                otherParameters: ["groupID"],
                description: "Retrieves the allocationd data belonging to the groupID from the data base if it exists, else retrieve the request data instead and sent it to the client"
            },
            {
                name: "confirm",
                otherParameters: ["groupID", "x", "y", "width", "height"],
                description: "Stores the allocation data given to the database belonging to the groupID"
            }
        ]
    }
]

//The class groupAllocation should actually be called checkAllocation
const checkAllocationMethod = [
    {
        name: "router.get",
        type: "HTTP Request",
        parameter1: {
            value: "path",
            type: String,
            optional: false 
        },
        returnValue: null,
        description: "Handles any allocation checking specific request to the URL path specified in the first parameter"
    },
    {
        name: "router.post",
        type: "HTTP Post ",
        parameter1: {
            value: "path",
            type: String,
            optional: false
        },
        paramerter2: {
            value: "type of request and other parameters specific to the request",
            type: JSON,
            optional: false
        },
        returnValue: null,
        description: "Handles any allocation checking specific post request on the URL path specified according to the type of request given in the second parameter",
        typeOfRequests: [
            {
                name: "firstload",
                otherParameters: null,
                description: "Fetches all the groups' allocation data from the database and sends it to the client"
            }
        ]
    }
]

const chatMethods = [
    {
        name: "io.on",
        type: "socket connection",
        parameter1: {
            value: "type of initialisation",
            type: String,
            optional: false
        },
        returnValue: Socket,
        description: "Initiliase the socket based on the type of initialisation given"
    },
    {
        name: "socket.join",
        type: "Chat",
        parameter1: {
            value: "roomID",
            type: String,
            optional: false,
        },
        returnValue: null,
        description: "Join the chat room given by the roomID"
    },
    {
        name: "socket.on",
        type: "Chat",
        parameter1: {
            value: "ID",
            type: String,
            optional: false
        },
        returnValue: String,
        description: "Scans the client side for any new messages posted on the web element with id given by the ID parameter and return the message posted"
    },
    {
        name: "io.to(room).emit",
        type: "chat",
        parameter1: {
            value: "msg",
            type: String,
            optional: false
        },
        returnValue: null,
        description: "Post message given in the msg parameter to the specific chat room"
    },
    {
        name: "router.get",
        type: "HTTP Request",
        parameter1: {
            value: "path",
            type: String,
            optional: false 
        },
        returnValue: null,
        description: "Handles any Chat specific request to the URL path specified in the first parameter"
    },
    {
        name: "router.post",
        type: "HTTP Post ",
        parameter1: {
            value: "path",
            type: String,
            optional: false
        },
        paramerter2: {
            value: "type of request and other parameters specific to the request",
            type: JSON,
            optional: false
        },
        returnValue: null,
        description: "Handles any Chat specific post request on the URL path specified according to the type of request given in the second parameter",
    }
]

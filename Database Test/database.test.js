const account = require('../models/accountSchema');

test("Test if we can save JSON to MongoDB correctly", () => {
    const testPost = new account( {
        groupNumber: "test",
        groupUserID: "test",
        groupPassword: "test",
        Role: "test"
    })
    testPost.save();
    var pass = fail;
    account.findOne({groupUserID: "test"}).then( res => {
        if(res) {
            if (res.groupNumber == "test" && res.groupPassword == "test" && res.Role == "test") {
                pass = true;
            }
        }
    }).then ( () => {
        expect(pass).toBe(true);
    })
})

test("Test if we can retrieve data from MongoDB correctly", () => {
    var pass = fail;
    account.findOne({groupUserID: "test"}).then (res => {
        if(res) {
            if (res.groupNumber == "test" && res.groupPassword == "test" && res.Role == "test") {
                pass = true;
            }
        }
    }).then( () => {
        expect(pass).toBe(true);
    })
})

test("Test if we can delete data from MongoDB correctly", () => {
    var pass = fail;
    account.findOneAndDelete({groupUserID: "test"})
    account.findOne({groupUserID: "test"}).then(res => {
        if (res) {

        }
        else {
            pass = true;
        }
    }).then( () => {
        expect(pass).toBe(true);
    })
})
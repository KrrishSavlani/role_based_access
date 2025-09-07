const userModel = require("../model/user");

async function signup(user) {
    try {
        const existingUserName = await userModel.findOne({ userName: user.userName });
        const existingEmail = await userModel.findOne({ email: user.email });


        const existingUser = await userModel.findOne({ userName: user.userName, email: user.email });
        if(existingUser){return "User already exists";}
        if (existingEmail) {
            return "Email ID already exists";
        }

        if (existingUserName) {
            return "Username is not availible";
        }


        const newUser = await userModel.create(user);
        console.log("inserting user");
        return "success";
    } catch (err) {
        return `${err}`;
    }
}
module.exports = { signup };
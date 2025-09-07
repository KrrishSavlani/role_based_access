const UserModel = require("../model/user");
const { verifyHash } = require("./passHash");
const {getToken} = require("../middlewares/auth");
async function login(user) {
    try {
        const existingUser = await UserModel.findOne({ userName: user.userName });
        if (!existingUser) {
            return "User not found";
        }

        const isPasswordValid = await verifyHash(user.password, existingUser.password);
        if (!isPasswordValid) {
            return "Credentials are wrong";
        }

        return "success";
    } catch (err) {
        return `${err}`;
    }
}

async function generateToken(user) {
    const token = await getToken(user);
    return token;
}

module.exports = { login , generateToken };
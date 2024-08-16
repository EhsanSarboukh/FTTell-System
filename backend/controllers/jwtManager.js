require('dotenv').config();
const jsonwebtoken = require("jsonwebtoken")

const jwtManager = (user)=>
{
    const accessToken =  jsonwebtoken.sign(
        {
            _id:user.id,
            name:user.username,

        },
        process.env.jwt_salt
    );

    return accessToken;

}



module.exports = jwtManager;
import jwt from "jsonwebtoken";

const generateToken = (response , userid) => {
    const token  = jwt.sign({userid}, process.env.JWT_SECRET_KEY , {expiresIn : "30d"});

    // set Jwt as an  HTTP-only cookie
    response.cookie('jwt', token , {
        httpOnly : true,
        secure : process.env.NODE_ENV !== 'development',
        sameSite : 'strict',
        maxAge : 30 * 24 * 60 * 60 * 1000  
    })

    return token;
}

export default generateToken;
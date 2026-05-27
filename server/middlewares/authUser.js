import jwt from 'jsonwebtoken';

// Admin Authentication middleware

const authUser= async(req, resp, next) => {
    try {

        const {token} = req.headers;
        if(!token){
            return resp.json({success:false, message:"Not Authorized, Login again.."})
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = token_decode.id;
        console.log(token_decode)

        next();
        
    } catch (error) {
        console.log(error);
        resp.json({success:false, error:error.message})
    }
}

export default authUser;
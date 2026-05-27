import jwt from 'jsonwebtoken';

// Admin Authentication middleware

const authAdmin= async(req, resp, next) => {
    try {

        const {atoken} = req.headers;
        if(!atoken){
            return resp.json({success:false, message:"Not Authorized, Login again.."})
        }

        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return resp.json({success:false, message:"Not Authorized, Login again.."});
        }

        next();
        
    } catch (error) {
        console.log(error);
        resp.json({success:false, error:error.message})
    }
}

export default authAdmin;
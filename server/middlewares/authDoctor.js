import jwt from 'jsonwebtoken';

// Admin Authentication middleware

const authDoctor= async(req, resp, next) => {
    try {

            const { dtoken } = req.headers;        
            if(!dtoken){
            return resp.json({success:false, message:"Not Authorized, Login again.."})
        }

        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

        req.docId = token_decode.id.toString();
        console.log(token_decode);

        next();
        
    } catch (error) {
        console.log(error);
        resp.json({success:false, error:error.message})
    }
}

export default authDoctor;
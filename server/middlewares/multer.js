// import multer from 'multer';

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // make sure this folder exists
//     },
//     filename:function(req, file, cb) {
//         cb(null, file.originalname);
//     }
// })

// const upload = multer({storage});

// export default upload;


import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,"uploads/")
    },
    filename:function (req, file,cb) {
        cb(null, Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({storage});

export default upload;
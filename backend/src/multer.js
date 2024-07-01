import multer from "multer";

const profileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/public/imgs/profiles");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const productStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/public/imgs/products");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + file.originalname;
        cb(null, uniqueSuffix);
    },
});

const documentsStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/public/docs");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
}); 

export const uploadProfile = multer({ storage: profileStorage });
export const uploadProduct = multer({ storage: productStorage });
export const uploadDocuments = multer({ storage: documentsStorage });
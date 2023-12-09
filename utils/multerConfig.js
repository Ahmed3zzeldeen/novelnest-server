const appError = require('./appError');
const multer  = require('multer');

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `User-${Date.now()}.${ext}`;
        cb(null, fileName);
    }
})

const diskStorageForBook = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `Book-${Date.now()}.${ext}`;
        cb(null, fileName);
    }
})


const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split('/')[0];
    
    if(imageType === 'image') {
        return cb(null, true)
    } else {
        return cb(appError.create('File must be an image', 400), false)
    }
}

const upload = multer({ 
    storage: diskStorage,
    fileFilter
})
const uploadForBook = multer({ 
    storage: diskStorageForBook,
    fileFilter
})

module.exports = {
    upload,
    uploadForBook
};
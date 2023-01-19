const express = require('express');
const router = express.Router();
const path = require('path')
const {
    registerRender,
    loginRender,
    profileRender,
    userLogin,
    userCreate,
    editRender,
    userEdit,
    logout
} = require('../controllers/userController');

const multer = require('multer'),
    storage =  multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, path.join('public','img','uploads','users'))
        },
        filename: (req, file, cb)=>{
            cb(null, file.originalname)
        }
    })
    const upload = multer({storage:storage})

router.get('/register', registerRender);
router.post('/register', userCreate);

router.get('/login', loginRender);
router.post('/login', userLogin);

router.get('/profile', profileRender);
router.get('/edit', editRender);
router.post('/edit', upload.array('uploadImage'), userEdit);

router.post('/logout', logout);

module.exports = router;
const router = require("express").Router();
const userControlller = require("../../../controllers/userController");

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./imgFolder/");
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    }
});

const saveImg = multer({ storage });

router.route("/").get(function(req, res, next) {
    res.send("It just works!");
});

router
    .route("/sign-up")
    .post(saveImg.single("sampleImg"), userControlller.create);

router.route("/sign-in").post(userControlller.signIn);

module.exports = router;

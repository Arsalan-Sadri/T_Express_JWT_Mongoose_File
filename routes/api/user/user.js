const router = require("express").Router();
const userControlller = require("../../../controllers/userController");
const middleware = require("../../../middleware");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./uploads/"),
    filename: (req, file, cb) =>
        cb(null, new Date().toISOString() + "-" + file.originalname)
});

const upload = multer({ storage });

router
    .route("/")
    .get((req, res, next) => res.send("App is running!"));

router
    .route("/sign-up")
    .post(upload.single("profilePic"), userControlller.signUp);

router
    .route("/sign-in")
    .post(userControlller.signIn);

router
    .use(middleware.verifyToken);    

module.exports = router;

// const express = require("express")
// const bodypersar = require("body-parser")
// const app = express();
// app.use(bodypersar.urlencoded({ extended: true }))
// app.use(bodypersar.json())
// app.get('/', (req, res) => {
//     res.json({ "msg": "hellow" });
// })
// app.listen(3000, () => {
//     console.log("server started at 3000")
// })


// ///connect database/............
// const dbConfig = require('./Config/database.config')
// const mongoose = require('mongoose')
// mongoose.Promise = global.Promise
// mongoose.connect(dbConfig.url).then(() => {
//     console.log("database connect sucsessfully")
// }).catch((err) => {
//     console.log(err)
//     process.exit()
// })


// const UserRoute = require("./app/routes")
// app.use("/users", UserRoute)
// // const UserRoute = require('./app/routes/User')
// // app.use('/user', UserRoute)

// const express = require("express")
// const app = express()
// const bodypersar = require("body-parser")
// app.listen(3000, () => { console.log("hellow") })
// app.use(bodypersar.json())
// app.get("/", (req, res) => {
//     res.status(200).send({ "msg": "response" })
// })

// dbconfig = require("./Config/database.config")
// const mongoose = require("mongoose")
// mongoose.Promise = global.Promise
// mongoose.connect(dbconfig.url).then(() => {
//     console.log("db connected sucsess")
// }).catch((err) => {
//     console.log(err)
//     process.exit;
// })
// const userRouter = require("./app/routes")
// const bodyParser = require("body-parser")
// app.use("/users", userRouter)

const express = require("express")
const mongoose = require("mongoose")
const bodyperser = require("body-parser")
const cors = require('cors');
const verifyToken = require('./middleware/Authmiddleware')
const UserController = require("./app/controler")
const app = express();

app.use(cors());

app.listen(3000, () => { console.log("port run in 3000") })
app.use(bodyperser.json())

app.get("/", (req, res) => { res.status(200).send({ "msg": "istpage" }) })
dbconfig = require("./Config/database.config")
mongoose.Promise = global.Promise
mongoose.connect(dbconfig.url).then(() => {
    console.log("db Connected sucsess")
}).catch((err) => { console.log(err) })





const userRouter = require("./app/routes")
app.use("/users", verifyToken, userRouter)
//........authroute......
app.post('/create', UserController.create);
app.post('/login', UserController.userLogin);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 




const multer = require('multer');
const path = require('path');




// Set up Multer for file upload with local storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const ext = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
    },
});

const upload = multer({ storage: storage });

// Route to handle image upload
app.post('/users/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageUrl = `http://${req.get('host')}/users/uploads/${req.file.filename}`;
    res.json({ imageUrl: imageUrl, message: 'Image uploaded successfully' });
});

// Serve uploaded images statically
app.use('/users/uploads', express.static(path.join(__dirname, 'uploads')));





const express = require('express');
const ServerConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/productRoute');
const cloudinary = require('./config/cloudinaryConfig');
const fs = require('fs/promises');
const { isLoggedIn } = require('./validation/authValidation');
const uploader = require('./middlewares/multerMiddleware');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoute');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/carts',cartRouter)
app.use('/orders', orderRouter);


app.get('/ping', isLoggedIn, (req, res) => {
    console.log(req.body);
    console.log(req.cookies);
    return res.json({ message: "pong" });
});


app.post('/photo', uploader.single('incomingFiles'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log("Result from Cloudinary:", result);
        

        await fs.unlink(req.file.path);
        
        return res.json({ message: 'Upload successful', cloudinaryUrl: result.secure_url });
    } catch (error) {
        console.error('Error uploading photo:', error);
        return res.status(500).json({ message: 'Error uploading photo', error });
    }
});


app.listen(ServerConfig.PORT, async () => {
    try {
        await connectDB();
        console.log(`Server started on port ${ServerConfig.PORT}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
});

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();
mongoose.connect(process.env.MONGO).then( () => {
    console.log("connected to MongoDB");
    
}).catch((err) =>{
    console.log(err);
}); 

const __dirname = path.resolve();

const app = express()

app.use(express.json())

app.use(express.static(path.join(__dirname, '/myproject/dist')));

app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, 'myproject', 'dist', 'index.html'));

});
//
app.use(cookieParser());

app.listen(3000, () => {
    console.log('Server is running on port 3000!'); 
});

app.use('/Backend/user', userRoutes); 

app.use('/Backend/auth', authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    });
  });



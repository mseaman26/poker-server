    //  /api/users

    import { connectMongoDB } from '../lib/mongodb.js'
    import User from '../models/user.js'
    import app from 'express'
    const userRoutes = app.Router()
    //CREATE USER
    userRoutes.post('/', async (req, res) => {
        try {
            console.log('request recieved')
            const { name, email } = await req.body;
            await connectMongoDB();
            await User.create({ name, email });
        
            res.status(201).json({ message: "User registered." });
        } 
        catch (error) {
            console.log('error: ', error)
            res.status(500).json(
            { message: "An error occurred while registering the user.", error }
            );
        }
    })

    export default userRoutes
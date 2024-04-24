    //  /api/users

    import { connectMongoDB } from '../lib/mongodb.js'
    import User from '../models/user.js'
    import app from 'express'
    const userRoutes = app.Router()
    //CREATE USER
    userRoutes.post('/', async (req, res) => {
        try {
            console.log('request recieved')
            console.log('req.body: ', req.params)
            const { name, email, firebaseId } = await req.body;
            await connectMongoDB();
            await User.create({ name, email, firebaseId });
        
            res.status(201).json({ message: "User registered." });
        } 
        catch (error) {
            console.log('error: ', error)
            res.status(500).json(
            { message: "An error occurred while registering the user.", error }
            );
        }
    })
    //Delete User
    userRoutes.delete('/:id', async (req, res) => {
        
        try {
            const { firebaseId } = req.body;
            await connectMongoDB();
            const deletedUser = await User.findOneAndDelete({ 
                firebaseId
             });
            res.status(200).json({ message: "User deleted." });
        } 
        catch (error) {
            res.status(500).json(
            { message: "An error occurred while deleting the user.", error }
            );
        }
    })
;

    export default userRoutes
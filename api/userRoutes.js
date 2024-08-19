
import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import { signToken } from '../lib/auth.js';

import User from '../models/user.js';
//PREFFIX: /api/users

//SIGNUP
router.post('/signup', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        console.log('heresdff')
        if (user) {
            console.log('user exists')
            return res.status(400).json({ message: 'User with this email already exists' });
        }else{
            console.log('creating user')
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10)
            })
            await user.save();
            const token = signToken(user);
            res.status(201).json({user, token});
        }
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})
//LOGIN
router.post('/login', async (req, res) => {
    console.log('login route hit')
    console.log('email in body: ', req.body.email)
    const email = req.body.email.toLowerCase();
    try {
        const user = await User.findOne({ 
            email
        });
        if (!user) {
            console.log('user not found')
            return res.status(401).send({ message: 'Invalid email or password' });
        }
        const correctPW = await bcrypt.compare(req.body.password, user.password);
        if (!correctPW) {
            console.log('incorrect password')
            return res.status(401).send({ message: 'Invalid email or password' });
        }
        const token = signToken(user);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})
//SEARCH USERS
router.get('/search/:searchTerm', async (req, res) => {
    const searchTerm = req.params.searchTerm
    console.log('searchTerm: ', searchTerm)
    try{
        const users = await User.find({
            $or: [
                {name: {
                    $regex: searchTerm, $options: 'i'}},
                {email: {
                    $regex: searchTerm,
                    $options: 'i'
                }}
            ]
        })
        .select('-password')
        res.status(200).json(users)
    }catch(err){
        console.log('err: ', err)
        res.status(500).json({ message: 'Internal server error' });
    }

})

export default router;

import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import { signToken } from '../lib/auth.js';

import User from '../models/user.js';


router.post('/signup', async (req, res) => {
    try {
        const user = await new User({
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10)
        });
        await user.save();
        const token = signToken(user);
        res.status(201).json({user, token});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ 
            email: req.body.email
        });
        if (!user) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }
        const correctPW = await bcrypt.compare(password, user.password);
        if (!correctPW) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }
        const token = signToken(user);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

export default router;
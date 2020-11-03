import express from 'express';
import userSchema from '../../models/User';
const router = express.Router();



router.get('/test', (req,res) => {
    res.send('api is working');
});

router.post('/register', (req, res)=> {
    const newUser = new userSchema({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    newUser.save()
        .then((user) => {
            res.send(user);
        }).catch((err) => {
            console.log(err);
        })
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    userSchema.findOne({email})
        .then((user) => {
            if(!user){
                return res.send('no email found');
            }
            if(password === user.password){
                res.send(JSON.stringify(user));
            }
        })
});

export default router;
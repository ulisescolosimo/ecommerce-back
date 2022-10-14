const User = require('../models/User')
const crypto = require('crypto') 
const bcryptjs = require('bcryptjs')
const sendMail = require('./sendMail')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const { KEY_JWT } = process.env

const validator = Joi.object({
    name: Joi.string()
    .min(3)
    .max(35)
    .required()
    .messages({
        'string.min': 'Name: min 3 characters',
        'string.max': 'Name: max 35 characters'
    }),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
    .required()
    .messages({
        'string.email': 'Email: the email must end with .com'
    }),

    password: Joi.string().
    pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .min(8)
    .max(35)
    .required()
    .messages({
        'string.min': 'Password: min 8 characters',
        'string.max': 'Password: max 35 characters'
    }),
    role: Joi.string()
    .required(),

    photo: Joi.string()
    .uri()
    .required()
    .messages({
        'string.uri':'Photo: The photo must start with "http"'
    }),
    
    from: Joi.string()
    .required(),

})

const userController = {
    
    createUser: async(req,res) => {
        try {

/*             let result = await validator.validateAsync(req.body)

            console.log(result); */

            await new User(req.body).save()

            res.status(201).json({
                message: 'User created',
                success: true
            })
        }catch (error) {
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
    },

    getUsers: async(req, res) => {
        let user = await User.find()
            try{
                if (user.length > 0) {
                    res.status(200).json({
                        message: "you get all the users",
                        response: user,
                        success: true
                    })
                } else {
                    res.status(404).json({
                        message: "could't find all the users",
                        success: false
                    })
                }
            }catch(error) {
                console.log(error)
            }
        },

    deleteUser: async(req, res) => {
            const {id} = req.params
            try {
                let deleted = await User.findByIdAndDelete({_id:id})
                if (deleted) {
                res.status(200).json({
                    message: "User deleted successfully",
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "User deleted failed",
                    success: false
                })
            }
        }catch(error) {
            console.log(error)
        }
        },

        signUp: async(req, res) => {

            let {name,photo,email,password,role,from} = req.body 

            try {
                let result = await validator.validateAsync(req.body)

                let user = await User.findOne({email})
                if(!user){
                    let logged = false
                    let verified = false
                    let code = crypto
                            .randomBytes(15) 
                            .toString('hex') 
                    if(from == 'form'){
                        password = bcryptjs.hashSync(password, 10)
                        user = await User({name,photo,email,password:[password],role,from: [from],logged,verified,code}).save()
                        
                        sendMail(email, code);
                        res.status(200).json({
                            message: "User signed up from form",
                            success: true
                        })
                    } else {
                        password = bcryptjs.hashSync(password, 10)
                        verified = true
                        user = await new User({name,photo,email,password:[password],role,from:[from],logged,verified,code}).save()
                        
                        res.status(201).json({
                            message: "User signed up from: "+from,
                            success: true
                        })
                    }
                } else {
                    if(user.from.includes(from)){
                        res.status(200).json({
                            message: "User already registered through this method",
                            success: false
                        })
                    } else {
                        user.from.push(from)
                        user.verified = true 
                        user.password.push(bcryptjs.hashSync(password, 10))
                        await user.save()
                        res.status(201).json({
                            message: "User signed up from: " + from,
                            success: true
                        })
                    }
                }
            }catch (error){
                console.log(error);
                res.status(400).json({
                    message: "Couldn't signed up",
                    success: false
                })
            }
        },

        verifyMail: async(req, res) => {
            const {code} = req.params
            try {
                let user = await User.findOne({code:code})
            if (user) {
                user.verified = true
                await user.save()
                res.redirect('http://localhost:3000/')
            } else {
                res.status(404).json({
                    massage: "Email has not account yet",
                    success:false
                })
            }
            } catch (error) {
                console.log(error)
                res.status(400).json({
                    message: "Couldn't verify account",
                    success: false
                })
            }
            
        },

        verifyToken: async(req, res) => {
            if(!req.error){
                const token = jwt.sign({id: req.user.id}, KEY_JWT, {expiresIn: 60 * 60 * 24})
                res.status(200).json({
                    success: true,
                    response: {
                        user: req.user,
                        token: token
                    },
                    message: 'Welcome '+req.user.name
                })
            }else{
                res.json({
                    success: false,
                    message: 'Sign in please!'
                })
            }
        },

        signIn: async(req, res) => {

            const { email, password , from } = req.body

            try {
                let user = await User.findOne({email})

                if(!user){
                    res.status(404).json({
                        success: false,
                        message: "User does not exists, please sign up",
                    })
                } else if(user.verified) { 

                    let checkPass = user.password.filter(element => bcryptjs.compareSync(password, element)) 

                    if(from == 'from'){

                        if(checkPass.length > 0) {
                            
                            let loginUser = {
                                id: user._id,
                                name: user.name,
                                email: user.email,
                                role: user.role,
                                photo: user.photo
                            }

                            let token = jwt.sign({id: user._id}, KEY_JWT, {expiresIn: 60*60*24})

                            res.status(200).json({
                                success: true,
                                response: 
                                {
                                    user: loginUser,
                                    token: token
                                },
                                message: "Welcome " + user.name
                            })
                            
                        } else {
                            res.status(400).json({
                                success: false,
                                message: "Username or password incorrect."
                            })
                        }
                    } else {

                        if (checkPass.length > 0) {

                        let loginUser = {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            photo: user.photo
                        }

                        user.logged = true;
                        await user.save();

                        let token = jwt.sign({id: user._id}, KEY_JWT, {expiresIn: 60*60*24})

                        res.status(200).json({
                            success: true,
                            response: 
                            {
                                user: loginUser,
                                token: token
                            },
                            message: "Welcome back " + user.name
                        })

                    } else {

                        res.status(400).json({
                            success: false,
                            message: "Username or password incorrect."
                        })

                    }
                }

                } else { 
                    res.status(200).json({
                        success: false,
                        message: "User not verified. Please check your email and try again."
                    })
                }

            } catch (error) {
                console.log(error);
            }
        },

        signOut: async(req,res) => {
            const id  = req.params.id
            const body = req.body

            try {
                let user = await User.findByIdAndUpdate(id, body)
            if(user) {
                user.logged = false
                await user.save()
                res.status(200).json({
                    success: true,
                    message: "Sign out successfully."
                })
            } else {
                res.status(404).json({
                    message: "Sign out failed.",
                    success: false
                })
            }
            }catch(error) {
                console.log(error)
            }
        },
    }
    

module.exports = userController
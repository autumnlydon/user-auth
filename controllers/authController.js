const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


exports.signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body

    // check if a user exists in the database
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    // hash the given password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user

    const newUser = await User.create({
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
    })

    // push new user to users array
    console.log("new user successfully created")

    // generate jwt token for user auth
    const token = jwt.sign(
        { id: newUser._id,
            email: newUser.email
         },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
    )
    // send response with user data and token
    res.status(201).json({ token })
}

exports.login = async (req, res) => {
    const {email, password} = req.body;

    // check if user exists in the database
    try {
        // 1. Find the user by email
        const user = await User.findOne({ email });
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // 2. Compare the plain password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid password' });
        }
    
        // 3. Create a token
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '3d' }
        );
    
        // 4. Send back the token
        res.status(200).json({ token });
    
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
      }
}
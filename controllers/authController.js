const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = []; // fake database for now

exports.signup = async (req, res) => {
    const { email, password } = req.body

    // check if a user exists in the database
    const existingUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    // hash the given password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user

    const newUser = {
        id: users.length + 1,
        email: email,
        password: hashedPassword,
    }

    // push new user to users array
    users.push(newUser);
    console.log("new user successfully created")

    // generate jwt token for user auth
    const token = jwt.sign(
        { id: newUser.id,
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
    console.log("📦 All current users:", users);

    const user = users.find((user => user.email.toLowerCase() === email.toLowerCase()));
    if (!user) {
        return res.status(404).json({message: "User not found"})
    }

    // compare if password matches what is in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({message: "Invalid password"})
    }

    // if it is a match!!! generate jwt for user

    const token = jwt.sign(
        { id: user.id,
            email: user.email
         },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
    )

    // send response with user data and token
    res.status(200).json({ token })
}
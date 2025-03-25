// script to update names for all users who may not have had name input fields

require('dotenv').config({path: '../.env'})

const mongoose = require("mongoose");
const User = require("../models/User");

mongoose.connect(process.env.MONGO_URI)
.then( async () => {
        const users = await User.find({
            $or: [
                { firstName: { $exists: false } },
                { lastName: { $exists: false } }
              ]
        });
        for (const user of users) {
            if (!user.firstName) user.firstName = 'Placeholder';
            if (!user.lastName) user.lastName = 'User';

            await user.save()
            console.log(`Patched user: ${user.email}`);
        }
        process.exit()
   
}).catch(err => {
    console.error("Error connecting or patching:", err);
    process.exit(1);
})

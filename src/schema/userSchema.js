const mongoose = require('mongoose');
const bcrypt=require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 5,
        lowercase: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minLength: 5,
        lowercase: true,
        trim: true
    },
    mobileNumber: {
        type: String,
        required: true,
        minLength: 10,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    role:{
        type :String,
        enum:["USER","ADMIN"],
        default:"USER"
    }
}, {
    timestamps: true
});

userSchema.pre('save',async function(){
            
         const hashedPassword=    await bcrypt.hash(this.password,10)
         this.password= hashedPassword
     
})

const User = mongoose.model('User', userSchema);

module.exports = User;


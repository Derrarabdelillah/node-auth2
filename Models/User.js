
import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;


const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please enter an email."],
        unique: true,
        lowercase: true,
        validate: [ validator.isEmail, "Please enter a valid email." ]
    },
    password: {
        type: String,
        required: [true, "Please enter a password."],
        minlength: [6, "Minimum password length is 6 characters."]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});

// Hashing password before saving the user
UserSchema.pre('save', async function(next) {
    try {
        if ( this.isModified('password') ) {
            this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(SALT_ROUNDS) );
        }
    } catch (err) {
        next(err);
    }
})

// Static method to login user
UserSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });

    if ( user ) {
        const auth = await bcrypt.compare(password, user.password);
        if ( auth ) {
            return user;
        }
        throw new Error('Incorrect password');
    }
    throw new Error('Incorrect email');
}

const User = mongoose.model('User', UserSchema);

export default User;
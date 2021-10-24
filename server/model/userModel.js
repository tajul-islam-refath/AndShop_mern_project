const { model, Schema } = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const crypto = require('crypto')
const jwtToken = require('jsonwebtoken')


const userSchema = new Schema({
    name: {
        firstName: {
            type: String,
            required: [true, 'Please Enter Your First Name'],
            maxLength: [30, 'Your first name cannot exceed 30 characters']
        },
        lastName: {
            type: String,
            required: [true, 'Please Enter Your Last Name'],
            maxLength: [30, 'Your last name cannot exceed 30 characters']
        }
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    gender: {
        type: String,
        required: true
    },
    birthDate: {
        year: {
            type: String,
            required: true
        },
        month: {
            type: String,
            required: true
        },
        day: {
            type: String,
            required: true
        }
    },
    mobile: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    },
    wiselist: [{
        type: Schema.ObjectId,
        ref: "Product"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})


// Hashin password befor saving user
// userSchema.pre('save', async function(next){
//     if (!this.isModified('password')) {
//         next();
//     }

//     this.password = await bcrypt.hash(this.password, 11);
// })

// Compare user password
userSchema.methods.comparePassword = async function(userPassword) {
    return await bcrypt.compare(userPassword, this.password);
}

// Return jwtToken
userSchema.methods.getToken = function() {
    return jwtToken.sign({
        id: this._id,
        name: this.name,
        email: this.email,
        avatar: this.avatar,
        mobile: this.mobile,
        role: this.role
    }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });
}

//Generate Reset Password token
userSchema.methods.getRestePasswordToken = function() {
    // Generate Token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // set expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;

}

const User = model('User', userSchema);

module.exports = User;
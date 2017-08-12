import { Schema, model } from 'mongoose';
import { createHmac } from 'crypto';
import * as config from 'config';
import * as jwt from 'jsonwebtoken';

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
}, { emitIndexErrors: true });

userSchema.methods.encryptPassword = function (password) {
    return createHmac('sha1', this.salt).update(password).digest('hex');
};

userSchema.virtual('password')
    .set(function (password) {
        if (!password || password.length < 5) {
            return;
        }
        this._plainPassword = password;
        this.salt = Math.random() + "";
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._plainPassword;
    });

userSchema.methods.checkPassword = function (password): boolean {
    return this.encryptPassword(password) === this.hashedPassword;
};

userSchema.methods.toJSON = function () {
    let user = this.toObject();
    delete user.hashedPassword;
    delete user.salt;
    delete user.__v;
    if (this.token) {
        user.token = this.token;
    }
    return user
}

userSchema.methods.createToken = function () {
    this.token = jwt.sign({
        _id: this._id,
        email: this.email,
        created: Date.now()
    }, config.get('jwt.secret'));
    return this;
}

export const User = model('User', userSchema);
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    name: {
        firstName: {
            type: String,
            required: true
        },
        middleName: {
            type: String
        },
        lastName: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        default: 'user'
    },
    wishlist: {
        type: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Book'
            }
        ],
        default: []
    },
    readingList: {
        type: [
            {
                book: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Book'
                },
                status: {
                    type: String,
                    enum: ['to-read', 'reading', 'finished'],
                    default: 'to-read'
                }
            }
        ],
        default: []
    },
    reviews: {
        type: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Review'
            }
        ],
        default: []
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
// UserSchema.static()
// UserSchema.method()
UserSchema.statics.isUserExist = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.User.findOne({ email }, { email: 1, password: 1, role: 1 });
        return user;
    });
};
UserSchema.statics.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const isMatched = yield bcrypt_1.default.compare(givenPassword, savedPassword);
        return isMatched;
    });
};
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
exports.User = (0, mongoose_1.model)('User', UserSchema);

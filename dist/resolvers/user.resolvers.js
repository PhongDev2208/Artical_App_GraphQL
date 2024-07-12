"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.resolversUser = void 0;
const generateHelper = __importStar(require("../helpers/generate.helper"));
const md5_1 = __importDefault(require("md5"));
const user_model_1 = __importDefault(require("../models/user.model"));
exports.resolversUser = {
    Query: {
        getUser: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (context.tokenVerify) {
                const user = yield user_model_1.default.findOne({
                    token: context.tokenVerify,
                    deleted: false,
                }).select("-password");
                if (user) {
                    return {
                        code: 200,
                        message: "Token valid",
                        id: user._id,
                        fullName: user.fullName,
                        email: user.email,
                        token: user.token,
                    };
                }
                else {
                    return {
                        code: 400,
                        message: "Token invalid",
                    };
                }
            }
            else {
                return {
                    code: 400,
                    message: "Token invalid",
                };
            }
        }),
    },
    Mutation: {
        registerUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { user }) {
            const userExist = yield user_model_1.default.findOne({
                email: user.email,
                deleted: false,
            });
            if (userExist) {
                return {
                    code: 400,
                    message: "Email already exists",
                };
            }
            else {
                user["token"] = generateHelper.generateRandomString(30);
                user["password"] = (0, md5_1.default)(user.password);
                const newUser = new user_model_1.default(user);
                yield newUser.save();
                return {
                    code: 200,
                    message: "Register success",
                    id: newUser._id,
                    fullName: newUser.fullName,
                    email: newUser.email,
                    token: newUser.token,
                };
            }
        }),
        loginUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { user }) {
            const userExist = yield user_model_1.default.findOne({
                email: user.email,
                deleted: false,
            });
            if (!userExist) {
                return {
                    code: 400,
                    message: "Account not found",
                };
            }
            if ((0, md5_1.default)(user.password) !== userExist.password) {
                return {
                    code: 400,
                    message: "Password is incorrect",
                };
            }
            return {
                code: 200,
                message: "Login success",
                id: userExist._id,
                fullName: userExist.fullName,
                email: userExist.email,
                token: userExist.token,
            };
        }),
    },
};

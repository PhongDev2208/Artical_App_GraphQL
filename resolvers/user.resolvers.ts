import * as generateHelper from "../helpers/generate.helper";
import md5 from "md5";

import User from "../models/user.model";
export const resolversUser = {
  Query: {
    getUser: async (_, __, context) => {
      if (context.tokenVerify) {
        const user = await User.findOne({
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
        } else {
          return {
            code: 400,
            message: "Token invalid",
          };
        }
      } else {
        return {
          code: 400,
          message: "Token invalid",
        };
      }
    },
  },
  Mutation: {
    registerUser: async (_, { user }) => {
      const userExist = await User.findOne({
        email: user.email,
        deleted: false,
      });

      if (userExist) {
        return {
          code: 400,
          message: "Email already exists",
        };
      } else {
        user["token"] = generateHelper.generateRandomString(30);
        user["password"] = md5(user.password);

        const newUser = new User(user);
        await newUser.save();

        return {
          code: 200,
          message: "Register success",
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          token: newUser.token,
        };
      }
    },
    loginUser: async (_, { user }) => {
      const userExist = await User.findOne({
        email: user.email,
        deleted: false,
      });

      if (!userExist) {
        return {
          code: 400,
          message: "Account not found",
        };
      }

      if (md5(user.password) !== userExist.password) {
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
    },
  },
};

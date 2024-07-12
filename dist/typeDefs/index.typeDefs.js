"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const artical_typeDefs_1 = require("./artical.typeDefs");
const category_typeDefs_1 = require("./category.typeDefs");
const user_typeDefs_1 = require("./user.typeDefs");
exports.typeDefs = [artical_typeDefs_1.typeDefsArtical, category_typeDefs_1.typeDefsCategory, user_typeDefs_1.typeDefsUser];

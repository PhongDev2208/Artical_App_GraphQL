"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const artical_resolvers_1 = require("./artical.resolvers");
const category_resolvers_1 = require("./category.resolvers");
const user_resolvers_1 = require("./user.resolvers");
exports.resolvers = [artical_resolvers_1.resolversArtical, category_resolvers_1.resolversCategory, user_resolvers_1.resolversUser];

import { createUser, readUserOne, updateUser } from "@/server/DL/controllers/user.controller";
import { checkFields, uploadImage } from "../function/function";
const bcrypt = require('bcrypt');
const saltRounds = 10;

import { isExist, validEmail, validPassword } from "../function/userValidation";
import { createToken } from "../utils/jwt";

export const createUserService = async (user) => {
    checkFields(user, ["email", "userName", "password"]);
    validEmail(user.email);
    validPassword(user.password);
    const existingUser = await isExist(user.email);
    if (existingUser) return updateUserExist(existingUser.id, user);

    const userSchema = {
        email: user.email,
        userName: user.userName,
        password: bcrypt.hashSync(user.password, saltRounds),
        avatar: user.avatar && (user.avatar = await uploadImage(user.avatar, 'userImage'))
    }
    const result = await createUser(userSchema);
    return result.email !== undefined;
};

export const loginService = async (data) => {
    const user = await readUserOne({ email: data.email }, {}, true);
    if (!user) throw { message: 'User not found' }
    const correctPassword = bcrypt.compareSync(data.password, user.password)
    if (!correctPassword) throw { message: 'password mismatch' }
    const token = createToken(user._id, user.permission);
    const userlogged = {
        name: user.userName,
        avatar: user.avatar?.image_url
    }
    return { token: token, userlogged }
}


export const updateUserService = (id, data) => updateUser(id, data);

const updateUserExist = async (id, user) => {
    const userUpdate = {
        userName: user.userName,
        password: bcrypt.hashSync(user.password, saltRounds),
        avatar: user.avatar && (user.avatar = await uploadImage(user.avatar, 'userImage')),
        isActive: true,
    }
    const result = await updateUserService(id, userUpdate);
    return result.email !== undefined;
}



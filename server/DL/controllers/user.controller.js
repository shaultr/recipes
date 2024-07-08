import { UserModel } from "../models/user.model";

export const createUser = (data) => UserModel.create(data)

export const readUserById = async (id, populate = {}, lean = true, select = '') => {
  let user = await UserModel.findById(id, select);
  if (populate?.recipes && user) await user.populate("recipes.recipe");
  if (populate?.cayegory && user) await user.populate('recipes.recipe.category');
  if (lean) user.lean();
  return user;
}
export const readUserOne = async (filter, populate = {}, password = false) => {
  let user = password ? await UserModel.findOne(filter, `+password`) : await UserModel.findOne(filter);
  if (populate?.recipes && user) await user.populate("recipes.recipe");
  if (populate?.cayegory && user) await user.populate('recipes.recipe.category');
  return user;
}

export const updateUser = (id, data) => UserModel.findByIdAndUpdate({ _id: id }, data, { new: true }).lean();

export const deletUserById = (id) => updateUser(id, { isActive: false })

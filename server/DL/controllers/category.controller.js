import { CategoryModel } from "../models/category.model";

export const readCategorys = () => CategoryModel.find().lean();

export const readCategory = async (filter, populate = false, lean = true) => {
  const category = populate
    ? CategoryModel.findOne(filter).populate("recipes")
    : CategoryModel.findOne(filter);
  if (lean) category.lean();
  return category;
};

export const readCategoryById = (id) =>
  CategoryModel.findById(id).populate("recipes").lean();
export const createCategory = (data) => CategoryModel.create(data);
export const updateCategory = (id, data) =>
  CategoryModel.findByIdAndUpdate({ _id: id }, data, { new: true })?.lean();
export const deleteRecipeById = (id) => CategoryModel.deleteOne({ _id: id })

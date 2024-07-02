import { CategoryModel } from "../models/category.model";

export const readCategorys = () => CategoryModel.find().lean();

export const readCategory = async (filter, populate = false, lean = true) => {
  const category = populate ? CategoryModel.findOne(filter).populate('recipes') : CategoryModel.findOne(filter);
   if(lean) category.lean();
   return category;
};

export const readCategoryById = (id) =>
  CategoryModel.findById(id).populate("recipes").lean();
export const createCategory = (data) => {
  console.log(data);
  CategoryModel.create(data)
  console.log(data);
};
export const updateCategory = (id, data) =>
  CategoryModel.findByIdAndUpdate({ _id: id }, data, { new: true })?.lean();

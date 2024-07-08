import { readCategoryService } from "../service/category.service";

export const getCategoryDetails = async (categoryTitle) => {
    const category = await readCategoryService({ title: categoryTitle });
    return {
      categoryId: category._id,
      imageDefault: category.image
    };
  };
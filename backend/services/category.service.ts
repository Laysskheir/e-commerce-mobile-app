//services/category.service.ts
import CategorySchema from "../models/category.model";

export class CategoryService {
  // Get all categories
  async getAllCategories() {
    return await CategorySchema.find();
  }

  // Get a single category by ID
  async getCategoryById(id: string) {
    const category = await CategorySchema.findById(id);
    
    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  }

  // Create a new category
  async createCategory(categoryData: {
    title: string, 
    description?: string
  }) {
    const category = new CategorySchema(categoryData);
    await category.save();
    return category;
  }

  // Update a category
  async updateCategory(id: string, categoryData: {
    title?: string, 
    description?: string
  }) {
    const updatedCategory = await CategorySchema.findByIdAndUpdate(
      id, 
      categoryData, 
      { new: true }
    );

    if (!updatedCategory) {
      throw new Error("Category not found");
    }

    return updatedCategory;
  }

  // Delete a category
  async deleteCategory(id: string) {
    const deletedCategory = await CategorySchema.findByIdAndDelete(id);

    if (!deletedCategory) {
      throw new Error("Category not found");
    }

    return deletedCategory;
  }
}

export const categoryService = new CategoryService();
//controllers/category.controller.ts
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { categoryService } from "../services/category.service";

// Create a category
export const createCategory = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description } = req.body;
    const category = await categoryService.createCategory({ 
      title, 
      description 
    });

    res.status(201).json({
      category,
      message: "Category created successfully"
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Get a single category by ID
export const getCategoryByID = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    res.status(200).json({ category });
  } catch (error) {
    if ((error as Error).message === "Category not found") {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(500).json({ message: (error as Error).message });
  }
};

// Update a category
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const category = await categoryService.updateCategory(req.params.id, {
      title,
      description
    });

    res.status(200).json({
      category,
      message: "Category updated successfully"
    });
  } catch (error) {
    if ((error as Error).message === "Category not found") {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(500).json({ message: (error as Error).message });
  }
};

// Delete a category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    await categoryService.deleteCategory(req.params.id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    if ((error as Error).message === "Category not found") {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(500).json({ message: "Failed to delete category" });
  }
};
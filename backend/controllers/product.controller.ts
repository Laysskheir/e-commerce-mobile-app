// backend/controllers/product.controller.ts
import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { validationResult } from 'express-validator';

const productService = new ProductService();

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { 
      categoryId, 
      searchQuery, 
      categories,
      minPrice, 
      maxPrice,
      sizes,
      colors,
      brand,
      sortBy 
    } = req.query;

    const products = await productService.getAllProducts({
      categoryId: categoryId as string,
      searchQuery: searchQuery as string,
      categories: Array.isArray(categories) 
        ? categories as string[] 
        : (categories ? [categories as string] : undefined),
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      sizes: Array.isArray(sizes) 
        ? sizes as string[] 
        : (sizes ? [sizes as string] : undefined),
      colors: Array.isArray(colors) 
        ? colors as string[] 
        : (colors ? [colors as string] : undefined),
      brand: brand as string,
      sortBy: sortBy as 'newest' | 'price_asc' | 'price_desc'
    });

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      message: 'Failed to fetch products',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const product = await productService.getProductBySlug(slug);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ 
      message: 'Failed to fetch product',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const productData = req.body;
    const newProduct = await productService.createProduct(productData);
    
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ 
      message: 'Failed to create product',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    
    const updatedProduct = await productService.updateProduct(id, productData);
    
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ 
      message: 'Failed to update product',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const deletedProduct = await productService.deleteProduct(id);
    
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ 
      message: 'Failed to delete product',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
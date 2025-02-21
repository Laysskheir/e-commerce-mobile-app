import { Request, Response } from 'express';
import { productController } from '../../controllers/product.controller';
import { ProductService } from '../../services/product.service';

jest.mock('../../services/product.service');

describe('Product Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    req = {};
    res = { status: statusMock };
  });

  test('should get all products', async () => {
    const mockProducts = [{ name: 'Product 1' }, { name: 'Product 2' }];
    ProductService.prototype.getAllProducts = jest.fn().mockResolvedValue(mockProducts);

    await productController.getProducts(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ products: mockProducts });
  });

  test('should create a product', async () => {
    req.body = { name: 'New Product', price: 100 };
    const mockProduct = { name: 'New Product', price: 100 };
    ProductService.prototype.createProduct = jest.fn().mockResolvedValue(mockProduct);

    await productController.createProduct(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({ product: mockProduct });
  });

  // Add more tests for updateProduct and deleteProduct
});
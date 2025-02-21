import { ProductService } from '../../services/product.service';
import ProductSchema from '../../models/product.model';

jest.mock('../../models/product.model');

describe('ProductService', () => {
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService();
  });

  test('should get all products', async () => {
    const mockProducts = [{ name: 'Product 1' }, { name: 'Product 2' }];
    ProductSchema.find = jest.fn().mockResolvedValue(mockProducts);

    const products = await productService.getAllProducts();
    expect(products).toEqual(mockProducts);
  });

  test('should create a product', async () => {
    const productData = { name: 'New Product', price: 100 };
    ProductSchema.prototype.save = jest.fn().mockResolvedValue(productData);

    const product = await productService.createProduct(productData);
    expect(product).toEqual(productData);
  });

  // Add more tests for other methods
});
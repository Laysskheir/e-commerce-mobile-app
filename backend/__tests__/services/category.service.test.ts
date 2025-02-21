import { CategoryService } from '../../services/category.service';
import CategorySchema from '../../models/category.model';

jest.mock('../../models/category.model');

describe('CategoryService', () => {
  let categoryService: CategoryService;

  beforeEach(() => {
    categoryService = new CategoryService();
  });

  test('should get all categories', async () => {
    const mockCategories = [{ title: 'Category 1' }, { title: 'Category 2' }];
    CategorySchema.find = jest.fn().mockResolvedValue(mockCategories);

    const categories = await categoryService.getAllCategories();
    expect(categories).toEqual(mockCategories);
  });

  test('should create a category', async () => {
    const categoryData = { title: 'New Category' };
    CategorySchema.prototype.save = jest.fn().mockResolvedValue(categoryData);

    const category = await categoryService.createCategory(categoryData);
    expect(category).toEqual(categoryData);
  });

  // Add more tests for other methods
});
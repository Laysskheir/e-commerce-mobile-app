import { Request, Response } from 'express';
import { categoryController } from '../../controllers/category.controller';
import { CategoryService } from '../../services/category.service';

jest.mock('../../services/category.service');

describe('Category Controller', () => {
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

  test('should get a category by ID', async () => {
    req.params = { id: 'someCategoryId' };
    const mockCategory = { title: 'Category 1' };
    CategoryService.prototype.getCategoryById = jest.fn().mockResolvedValue(mockCategory);

    await categoryController.getCategoryByID(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ category: mockCategory });
  });

  // Add more tests for createCategory, updateCategory, and deleteCategory
});
import Category from "../models/category.model";

export const resolversCategory = {
  Query: {
    getListCategory: async () => {
      const categories = await Category.find({
        deleted: false,
      });

      return categories;
    },
  },
  Mutation: {
    createCategory: async (_, { category }) => {
      const newCategory = new Category(category);
      await newCategory.save();

      return newCategory;
    },
    deleteCategory: async (_, args) => {
      const { id } = args;

      await Category.updateOne(
        { _id: id },
        { deleted: true, deletedAt: new Date() }
      );

      console.log(id);

      return "Delete success!";
    },
    updateCategory: async (_, args) => {
      const { id, category } = args;

      await Category.updateOne(
        {
          _id: id,
        },
        category
      );

      const categoryUpdated = await Category.findOne({ _id: id });

      return categoryUpdated;
    },
  },
};

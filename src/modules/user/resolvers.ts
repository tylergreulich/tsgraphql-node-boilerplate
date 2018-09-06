export const resolvers = {
  Query: {
    getAllUsers: async (root, {}, { User }) => await User.find()
  }
};

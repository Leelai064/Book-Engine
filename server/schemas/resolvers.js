const { User } = require('../models');
const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async () => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
   
  },
  Mutation: {
    addUser: async (parent, args) => {
      const matchup = await Matchup.create(args);
      return matchup;
    },
    login: async (parent, { _id, techNum }) => {
      const vote = await Matchup.findOneAndUpdate(
        { _id },
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
    saveBook: async ()=>{},
    removeBook: async ()=>{}
  },
};

module.exports = resolvers;

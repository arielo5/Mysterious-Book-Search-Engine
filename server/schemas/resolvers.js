const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password')
                return userData;
            }
            throw new AuthenticationError('Not logged in')
        }
    },

    Mutation: {
        deleteBook: async(parent, args, context) => {
        if (context.user){
            const updateUser = await User.findOneAndUpdate(
                {_id: context.user.id},
                {$pull: {savedBook: {bookId: args.bookId}}},
                {new: true}
            );
            return updateUser;
        }
        throw new AuthenticationError('You need to be logged in!')
        },

        saveBook: async(parent, { input }, context) => {
            if (context.user){
                const updateUser = await User.findOneAndUpdate(
                    {_id: context.user.id},
                    {$addToSet: {savedBook: input }},
                    {new: true}
                );
                return updateUser;
            }
            throw new AuthenticationError('You need to be logged in!')
    
        },

        addUser: async(parent, args) => {
            const user = await User.create(args);
            const token = await signToken(user);

            return { token, user };
        },

        login: async ( parent, {email, password} ) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
              }
              
              const correctPass = await user.isCorrectPassword(password);
        
              if (!correctPass) {
                throw new AuthenticationError('Incorrect credentials');
              }
        
              const token = signToken(user);
              return { token, user };
        }
    }
}


module.exports = resolvers;
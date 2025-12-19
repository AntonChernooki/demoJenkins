const { User } = require('../models/models');

const UserRepository = {
    findByEmail: async (email) => {
        return await User.findOne({ where: { email } });
    },

    create: async (data) => {
        return await User.create(data);
    }
};

module.exports = UserRepository;
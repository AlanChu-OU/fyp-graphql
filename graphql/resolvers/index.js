const authResolver = require('./auth');
const habitplanResolver = require('./habitplan');
const planitemResolver = require('./planitem');
const planrecordResolver = require('./planrecord');
const userResolver = require('./user');

const rootResolver = {
    ...authResolver,
    ...habitplanResolver,
    ...planitemResolver,
    ...planrecordResolver,
    ...userResolver
};

module.exports = rootResolver;
const authResolver = require('./auth');
const habitplanResolver = require('./habitplan');

const rootResolver = {
    ...authResolver,
    ...habitplanResolver
};

module.exports = rootResolver;
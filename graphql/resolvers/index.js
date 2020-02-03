const authResolver = require('./auth');
const habitplanResolver = require('./habitplan');
const planitemResolver = require('./planitem');
const planrecordResolver = require('./planrecord');

const rootResolver = {
    ...authResolver,
    ...habitplanResolver,
    ...planitemResolver,
    ...planrecordResolver
};

module.exports = rootResolver;
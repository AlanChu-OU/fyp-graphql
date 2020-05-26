const authResolver = require('./auth');
const habitplanResolver = require('./habitplan');
const planitemResolver = require('./planitem');
const planrecordResolver = require('./planrecord');
const userResolver = require('./user');
const coachResolver = require('./coach/coach');
const studentResolver = require('./coach/student');

const rootResolver = {
    ...authResolver,
    ...habitplanResolver,
    ...planitemResolver,
    ...planrecordResolver,
    ...userResolver,
    ...coachResolver,
    ...studentResolver
};

module.exports = rootResolver;
const signOutRouter = require('express').Router();


signOutRouter.get('/', (request, response) => {
    response.status(200).send("Signed Out successfuly");
})


module.exports = signOutRouter;
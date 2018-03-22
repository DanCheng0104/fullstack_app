const promise = require('bluebird');
const production = true;
const options = {
    // Initialization Options
    promiseLib: promise
  };
const pgp = require('pg-promise')(options);
pgp.pg.defaults.poolSize = 20;

if (production){
    const connectionString = `${process.env.DATABASE_URL}?ssl=true`;
    const db = pgp(connectionString);
}
else{
    const config = require('./config');
    var db = pgp(config.connectionString);
}


// add query functions
function getAllPuppies(req, res, next) {
    db.any('select name from nb_4326 limit 10;')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ALL puppies'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }

module.exports = {
   getAllPuppies: getAllPuppies
//   getSinglePuppy: getSinglePuppy,
//   createPuppy: createPuppy,
//   updatePuppy: updatePuppy,
//   removePuppy: removePuppy
};
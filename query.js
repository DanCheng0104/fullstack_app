const promise = require('bluebird');
const config = require('./config');
var options = {
  // Initialization Options
  promiseLib: promise
};
console.log(config.connectionString);


var pgp = require('pg-promise')(options);
var db = pgp(config.connectionString);

// add query functions
function getAllPuppies(req, res, next) {
    db.any('select ST_AsGeoJSON(shape) from nb where year = 2011 and usetype = \'all\' limit 10;')
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
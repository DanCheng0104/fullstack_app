const promise = require('bluebird');

//prod
// const options = {
//     // Initialization Options
//     promiseLib: promise
// };
// const pgp = require('pg-promise')(options);
// pgp.pg.defaults.poolSize = 20;
// const connectionString = `${process.env.DATABASE_URL}?ssl=true`;
// const db = pgp(connectionString);
//local
const options = {
    // Initialization Options
    promiseLib: promise
  };
const pgp = require('pg-promise')(options);
const config = require('./config');
const db = pgp(config.connectionString);

// add query functions
function getAllNbs(req, res, next) {
    db.any('select *,st_asgeojson(geom) from water_usage_bld_nb_frontend where usetype in (\'commercial\',\'institutional\',\'other\',\'industrial\',\'res\',\'mixed_use\',\'all\') and data_load_period_id=2;')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ALL nbs'
          });
      })
      .catch(function (err) {
        return next(err);
      });
}

function getAllData(req, res, next) {
  db.any('select id,usetype,usage_int,sqft,usage_med,usage_med_sqft,year,data_load_period_id,name from water_usage_bld_nb_frontend where data_load_period_id=2;')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL data'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSummaryInfo(req, res, next){
  db.any('select geo_id,name,pop,pop_sqmi,med_income,pct_own,pct_rent,year,count,enviroscreen_tracts from summary where year = \'2014\';')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL data'
        });
    })
    .catch(function (err) {
      return next(err);
    });  
}


module.exports = {
    getAllNbs: getAllNbs,
    getAllData: getAllData,
    getSummaryInfo: getSummaryInfo
//   getSinglePuppy: getSinglePuppy,
//   createPuppy: createPuppy,
//   updatePuppy: updatePuppy,
//   removePuppy: removePuppy
};
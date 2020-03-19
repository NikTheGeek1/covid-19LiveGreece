'use strict';
const Stamp = require('../models/mongoosSchema'); // fetching the userSchema in the user model

module.exports = function(polish_data, _){
  return {
    SetRouting: function(router){
      router.get('/', this.getIndexPage)
    },
    getIndexPage: function(req, res){
      const dates = [];
      const total_cases = [];
      const recovered = [];
      const deaths = [];
      const news = [];

    Stamp.find({}, function (err, allDetails) {
      _.forEach(allDetails, function(val, key) {
        dates.push(new Date(val.update_time.slice(14, )));
        total_cases.push(Number(val.total_cases));
        recovered.push(Number(val.recovered));
        deaths.push(Number(val.deaths));
        news.push(val.news);

      });
      res.render('index', {
        dates:JSON.stringify(dates),
        total_cases:JSON.stringify(total_cases),
        recovered:JSON.stringify(recovered),
        deaths:JSON.stringify(deaths),
        news:JSON.stringify(news)
      });

      });

    }
  }

}

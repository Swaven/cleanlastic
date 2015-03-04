"use strict";

var request = require('request');
var moment = require('moment');

var host = process.argv[2];
var days_s = process.argv[3];

var days = parseInt(days_s, 10);
if (isNaN(days)){
    throw days_s + " is not a valid day count";
}

// last day to keep
var last = moment().subtract(days, 'days').startOf('day');

//console.log(host + " / " + last.toString());

// get all indexes on host
request(host + "/_aliases", function(err, resp, body){
    if (!err && resp.statusCode === 200){
        //console.log(body);
        var list_index = JSON.parse(body);
        var indexes = [];

        for (var prop in list_index){
            // adds all indexes whose name conforms to logstash format
            if (/logstash-\d{4}\.\d{2}\.\d{2}/.test(prop)){
                indexes.push(prop);
                indexes.sort();
            }
        }

        var deleteCount = 0;

        for (var i = 0; i< indexes.length; i++){
            var idx = indexes[i];

            // extracts date from index name
            var res = /\d{4}\.[01]\d\.[0123]\d/.exec(idx);
            if (res != null){
                var date_s = res[0];

                // converts to moment date
                var date = moment(new Date(date_s));
                var del = date < last; // checks whether to delete index

                //console.log(date.format("YYYY-MM-DD") + (del? ": delete": ""));

                if (del){
                    deleteCount++;
                    // delete request
                    request.del(host + "/" + idx, function(err, resp, body ){
                        if (err)
                            console.log("Err on "+ idx +": " + err);
                    });
                }
            }
        }

        console.log("deleted " + deleteCount + "/" + indexes.length + " indexes")
    }
});

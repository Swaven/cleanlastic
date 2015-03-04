# cleanlastic
deletes logstash elastic search indexes

## /!\ Warning /!\
This repository is public. Do not include anything that should remain private: IPs, AWS credentials, etc.

### Running the script

`node cleanlastic.js host days`

**host**: url to the elastic search server, including port number, *without* trailing slash.  
**days**: number of days to keep in logs. must be a positive integer

### Dependencies
* [Nodejs](http://nodejs.org) < 0.12.x
* [MomentJs](http://momentjs.com)
* [request](https://www.npmjs.com/package/request) - Not compatible with Node 0.12.x

### Setup
* copy the file cleanlastic.js to its destination
* install dependencies: `npm install moment request`
* set up cron table

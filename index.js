'use strict';

const Config = require('./lib/configw');

const rootPath = process.env['CONFIGW_ROOT_PATH'] || process.cwd();

const config = new Config(rootPath);

module.exports = config;

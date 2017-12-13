'use strict';

const fs = require('fs');
const _ = require('./defaults');

class ConfigW {
    constructor(configPath) {
        this.$configPath = configPath;

        this.$fetchData();
        this.$mountData();
    }
    $fetchFile(filePath) {
        try {
            return require(filePath);
        } catch(ex) {
            return {};
        }
    }
    $fetchDirectory(dirPath) {
        try {
            return fs.readdirSync(dirPath).filter((s) => {
                const sp = s.split('.');
                if(sp.length < 2 || ['js', 'json'].indexOf(sp[sp.length - 1]) < 0 ) {
                    return false;
                }
                return true;
            }).filter(s => s !== 'index.js'
            && s !== 'index.json').map(s=>{
                const sp = s.split('.');
                sp.pop();
            
                const file = {
                    path: `${dirPath}/${s}`,
                    name: sp.join('.')
                };
                return file;
            });
        } catch(ex) {
            return [];
        } 
    }

    $fetchConfig(indexName) {
        const configPath = this.$configPath;
        let config = {};
        // config.js
        config = _.assign(config, this.$fetchFile(configPath + `/${indexName}.js`));
        // config.json
        config = _.assign(config, this.$fetchFile(configPath + `/${indexName}.json`));
        // config/index.js
        config = _.assign(config, this.$fetchFile(configPath + `/${indexName}/index.js`));
        // config/index.json
        config = _.assign(config, this.$fetchFile(configPath + `/${indexName}/index.json`));
        
        const files = this.$fetchDirectory(configPath + `/${indexName}`);
        const tmpConfig = {}
        for(const file of files) {
            const name = file.name;
            const path = file.path;
            tmpConfig[name] = this.$fetchFile(path); 
        }
        return _.assign(config, tmpConfig);
    }

    $fetchData() {
        const config = this.$fetchConfig('config');
        const localConfig = this.$fetchConfig('local_config');
        this.$data = _.assign(config, localConfig);
    }

    $mountData() {
        const data = this.$data;
        const keys = Object.keys(data);
        for(const key of keys) {
            this[key] = data[key];
        }
    }

    $unmountData() {
        const data = this.$data;
        const data = this.$data;
        const keys = Object.keys(data);
        for(const key of keys) {
            try {
                this[key] = undefined;
            } catch(ex) {

            }
        }
    }

    $remount() {
        this.$fetchData();
        this.$unmountData();
        this.$mountData();
    }
}

module.exports = ConfigW;

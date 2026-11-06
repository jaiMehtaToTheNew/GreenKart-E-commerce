const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({testDir:'./tests',use:{baseURL:process.env.BASE_URL||'http://127.0.0.1:4173',trace:'retain-on-failure'},reporter:[['list'],['html',{open:'never'}]],webServer:process.env.BASE_URL?undefined:{command:'npm start',url:'http://127.0.0.1:4173',reuseExistingServer:!process.env.CI}});

const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,
    env: {
      username: process.env.USER_NAME,
      password: process.env.PASS_USER,
      userinvalid: process.env.USER_INVALID,
      passinvalid: process.env.PASS_INVALID,
      userlock: process.env.USER_LOCK,
    },
    allowCypressEnv: true,
    watchForFileChanges: false,
    viewportWidth: 1440,
    viewportHeight: 1080,
    screenshotOnRunFailure: false,
    setupNodeEvents(on, config) {
      allureWriter(on, config);

      return config;
    },
  },
});

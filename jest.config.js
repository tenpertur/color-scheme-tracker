const { TestEnvironment } = require("jest-environment-jsdom")

module.exports = async () => {
    return {
        testEnvironment: 'jsdom'
    }
}

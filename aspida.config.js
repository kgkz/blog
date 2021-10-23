const { SERVICE_DOMAIN } = process.env

module.exports = { input: 'src/api', baseURL: `https://${SERVICE_DOMAIN}.microcms.io/api/v1/` }

const path = require('path');
const { configDotenv } = require('dotenv');

configDotenv({
  path: path.join(__dirname, './config.env'),
});

const pricingGlobal = process.env.PRICING_GLOBAL || '69';
const pricingGlobalExt = process.env.PRICING_GLOBAL_EXTENDED || '99';
const pricingVat = process.env.PRICING_VAT_PERCENTAGE || '19';

module.exports = Object.freeze({
  globalPricing_noVat: +pricingGlobal,
  globalPricing: +pricingGlobal * (+pricingVat / 100) + +pricingGlobal,
  globalExtendedPricing:
    +pricingGlobalExt * (+pricingVat / 100) + +pricingGlobalExt,
  globalExtendedPricing_noVat: +pricingGlobalExt,
  vatPercentage: +pricingVat / 100,
});

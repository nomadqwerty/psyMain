const { configDotenv } = require('dotenv');
const PaymentProviderFactory = require('./factory');
const GoCardlessProvider = require('../providers/go-cardless');
const { WireTransferProvider } = require('../queues/wire-transfer');

configDotenv();
const createPaymentService = () => {
  const goCardlessProvider = new GoCardlessProvider(
    process.env.GC_API_KEY || 'sandbox_Bp2AWXMcEZave2VV32rksFFyV3OigXhs37-Tio8Z'
  );
  const wireTransferProvider = new WireTransferProvider();
  return new PaymentProviderFactory(goCardlessProvider, wireTransferProvider);
};

module.exports = createPaymentService;

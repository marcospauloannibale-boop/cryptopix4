// Mock data for CryptoPIX clone

export const cryptocurrencies = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: '₿',
    rate: 350000,
    network: 'Bitcoin',
    networkFee: 0.0001,
    minAmount: 0.001
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: 'Ξ',
    rate: 15000,
    network: 'Ethereum (ERC-20)',
    networkFee: 0.002,
    minAmount: 0.01
  },
  {
    id: 'usdt',
    name: 'Tether',
    symbol: 'USDT',
    icon: '₮',
    rate: 5.80,
    network: 'Ethereum (ERC-20)',
    networkFee: 0.5,
    minAmount: 10
  },
  {
    id: 'usdc',
    name: 'USD Coin',
    symbol: 'USDC',
    icon: '$',
    rate: 5.80,
    network: 'Ethereum (ERC-20)',
    networkFee: 0.5,
    minAmount: 10
  },
  {
    id: 'bnb',
    name: 'Binance Coin',
    symbol: 'BNB',
    icon: 'B',
    rate: 2800,
    network: 'BNB Smart Chain',
    networkFee: 0.0005,
    minAmount: 0.01
  },
  {
    id: 'drex',
    name: 'DREX',
    symbol: 'DREX',
    icon: 'R$',
    rate: 1,
    network: 'Blockchain Brasil',
    networkFee: 0,
    minAmount: 1
  }
];

export const PLATFORM_FEE_PERCENT = 1.5;

export const INVOICE_EXPIRY_MINUTES = 15;

export const mockStores = [
  {
    id: 'store1',
    name: 'Loja Tech Brasil',
    owner: 'João Silva',
    email: 'joao@lojatech.com.br',
    apiKey: 'cpx_live_4f8g9h2j3k4l5m6n7o8p9q0r',
    createdAt: '2024-12-01',
    totalTransactions: 1543,
    totalVolume: 245789.50,
    status: 'active'
  },
  {
    id: 'store2',
    name: 'E-commerce Premium',
    owner: 'Maria Santos',
    email: 'maria@ecommercepremium.com',
    apiKey: 'cpx_live_8s9t0u1v2w3x4y5z6a7b8c9d',
    createdAt: '2024-11-15',
    totalTransactions: 892,
    totalVolume: 156432.80,
    status: 'active'
  },
  {
    id: 'store3',
    name: 'Digital Store Pro',
    owner: 'Carlos Oliveira',
    email: 'carlos@digitalstore.com.br',
    apiKey: 'cpx_live_2e3f4g5h6i7j8k9l0m1n2o3p',
    createdAt: '2024-10-20',
    totalTransactions: 2341,
    totalVolume: 489562.30,
    status: 'active'
  }
];

export const mockTransactions = [
  {
    id: 'CPX-20260114-2RXY27',
    type: 'crypto_to_pix',
    status: 'completed',
    amount: 1500.00,
    crypto: 'bitcoin',
    cryptoAmount: 0.0042857,
    pixKey: '11987654321',
    message: 'Pagamento de serviços',
    fee: 22.50,
    networkFee: 35.00,
    totalCrypto: 0.0044507,
    createdAt: '2026-01-14T10:30:00',
    paidAt: '2026-01-14T10:32:15',
    expiresAt: '2026-01-14T10:45:00'
  }
];

export const generateInvoiceId = () => {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `CPX-${dateStr}-${random}`;
};

export const generateCryptoAddress = (crypto) => {
  const addresses = {
    bitcoin: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    ethereum: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    usdt: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    usdc: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    bnb: 'bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2',
    drex: 'drex1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0'
  };
  return addresses[crypto] || addresses.bitcoin;
};

export const generatePixKey = () => {
  return '00020126580014br.gov.bcb.pix0136' + 
         Math.random().toString(36).substring(2, 15) + 
         '5204000053039865802BR5925CRYPTOPIX PAGAMENTOS LT6009SAO PAULO62070503***63041D3A';
};
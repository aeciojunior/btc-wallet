// Importando as dependências
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

// Definindo a rede 
// Se for rodar num ambiente real devemos usar 'bitcoin.networks.bitcoin' (mainnet)
// bitcoin = rede oficial
// testnet = rede de testes
const network = bitcoin.networks.testnet;

// Criando o caminho de derivação de endereços de carteiras
// Trabalhando com uma carteira hierárquica determinística (HD)
const path = `m/49'/1'/0'/0`;

// Gerando o mnemônico para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic(); // Adicionei parênteses para chamar a função
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Criando a raiz da carteira determinística (HD)
let root = bip32.fromSeed(seed, network);

// Criando uma conta - par de chaves [pvt-key/pub-key]
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

// Gerando um endereço
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address;

// Escrevendo dados na carteira
console.log("Carteira gerada");
console.log("Endereço: ", btcAddress);
console.log("Chave privada: ", node.toWIF());
console.log("Seed: ", mnemonic);

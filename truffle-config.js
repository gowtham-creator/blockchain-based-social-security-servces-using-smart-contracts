module.exports = {
  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache, geth, or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    development: {
      host: "127.0.0.1",  // Localhost (default: none)
      port: 7545,         // Standard Ganache port (default: 7545)
      network_id: "5777", // Match Ganache network id (default: 5777)
    },
    // Other network configurations can remain commented or can be set as needed
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.21",  // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,     // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {       // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },

  // Uncomment and configure Truffle DB if needed
  // db: {
  //   enabled: false,
  //   host: "127.0.0.1",
  //   adapter: {
  //     name: "indexeddb",
  //     settings: {
  //       directory: ".db"
  //     }
  //   }
  // }
};

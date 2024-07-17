const Buffer = require('safe-buffer').Buffer
const multiHashing = require('../build/Release/multihashing')

const algoTests = [
  ['cryptonight','cryptonight          '],
  ['cryptonight-lite','cryptonight-lite     '],
  ['cryptonight-armor','cryptonight-armor    '],
  ['cryptonight-armor-lite','crptonite-armor-lite ']
]

const variants = [
  0,
  1,
  2
]

const testdata = new Buffer('0100fb8e8ac805899323371bb790db19218afd8db8e3755d8b90f39b3d5506a9abce4fa912244500000000ee8146d49fa93ee724deb57d12cbc6c6f3b924d946127c7a97418f9348828f0f02', 'hex')

function runBenchmark (algo, variant, iterations) {
  iterations = iterations || 1000
  var time = Date.now()
  for (var i = 0; i < iterations; i++) {
    multiHashing[algo](testdata, variant)
  }
  time = (Date.now() - time) / 1000
  return Math.floor(iterations / time)
}

console.log(' ')
console.log('Algo Testing        Variant   Hashrate H/s')
console.log('------------        -------   ------------')
console.log(' ')

for (var i = 0; i < algoTests.length; i++) {
  for (var j = 0; j < variants.length; j++) {
    var hashrate = runBenchmark(algoTests[i][0], variants[j])
    console.log(algoTests[i][1] + ' v' + variants[j] + '        ' + hashrate + ' H/s')
  }
}
console.log(' ')
console.log(' ')
const chukwaHashrate = runBenchmark('chukwa')
console.log('chukwa: %s H/s', chukwaHashrate)

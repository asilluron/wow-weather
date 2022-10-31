exports.generateToken = function() {
    const {MersenneTwister19937, integer} = require('random-js');
    const engine = MersenneTwister19937.autoSeed();
    const dist = integer(0, 9);

    let token = '';
    for (let i = 6; i > 0; i--) {
      token += ('' + dist(engine));
    }

    return token;
}
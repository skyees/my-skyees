/**
 * Created by RAJKIRAN on 19-05-2015.
 */
var cluster = require('cluster');

if (cluster.isMaster) {
    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    // Listen for dying workers
    cluster.on('exit', function () {
        cluster.fork();
    });
} else {
    var isWin = /^win/.test(process.platform);
    if(!isWin) {
        kill(processing.pid);
    } else {
    require('./server');}
}

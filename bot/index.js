var childProcess = require("child_process");

function runScript(scriptPath, callback) {
  // keep track of whether callback has been invoked to prevent multiple invocations
  var invoked = false;

  var process = childProcess.fork(scriptPath);

  // listen for errors as they may prevent the exit event from firing
  process.on("error", function (err) {
    if (invoked) return;
    invoked = true;
    callback(err);
  });

  // execute the callback once the process has finished running
  process.on("exit", function (code) {
    if (invoked) return;
    invoked = true;
    var err = code === 0 ? null : new Error("exit code " + code);
    callback(err);
  });
}

const schedule = require("node-schedule");

schedule.scheduleJob("0 * * * *", function () {
  console.log("The answer to life, the universe, and everything!");
  // Now we can run a script and invoke a callback when complete, e.g.
  runScript("./bot/generate.js", function (err) {
    if (err) throw err;
    console.log("finished running generate.js");
  });
});

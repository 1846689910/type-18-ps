const shell = require("shelljs");
const Path = require("path");
const logger = require("funny-react-app-archetype/config/utils/color-logger");
const method = process.argv[2];

const isWin32 = process.platform === "win32";
const setEnv = env => ({ ...env, ...(!isWin32 && { PATH: process.env.PATH + ":/usr/local/bin" }) });
const baseCommand = cmd => (isWin32 ? cmd : `$"${cmd}"`);

const baseCommands = {
  runDevServer: `${baseCommand(
    "webpack-dev-server"
  )} --config webpack.config.dev.js --progress --color`,
  build: `${baseCommand("webpack")} --color`
};

const rmFiles = dir => shell.rm("-rf", dir);

const methods = {
  runDev() {
    shell.exec(baseCommands.runDevServer, {
      env: setEnv({ NODE_ENV: "development" })
    });
  },
  runProd() {
    shell.exec(baseCommands.runDevServer, {
      env: setEnv({ NODE_ENV: "production" })
    });
  },
  build(){
    rmFiles(Path.resolve("dist*"));
    shell.exec(baseCommands.build, {
      env: setEnv({ NODE_ENV: "production" })
    });
  }
};

if (methods[method]) {
  methods[method]();
} else {
  logger.danger("No matched command found");
}

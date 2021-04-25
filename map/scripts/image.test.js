const child_process = require('child_process');
const path = require('path');
const fs = require('fs');
const account = process.argv.slice(2)[0]; //账号
let port = process.argv.slice(2)[1]; //主机端口

try {
  imageTest();
} catch (err) {
  console.log(`process ${err}`);
}

async function imageTest() {
  if (!account) {
    console.log('请输入(reg.htres.cn)镜像仓库账户名称!!!');
    return;
  }
  if (!port) {
    port = '8080';
  }
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageObj = JSON.parse(fs.readFileSync(packageJsonPath));
  const fileName = packageObj.name;

  commandExec(`docker login --username=${account} reg.htres.cn`).then(result => {
    commandExec(`docker pull reg.htres.cn/${account}/${fileName}:latest`).then(async res => {
      await commandExec(`docker run -d -p ${port}:8080 reg.htres.cn/${account}/${fileName}:latest`);
      console.log(`测试访问地址：http://localhost:${port}/developer/demo`);
    });
  });
}

function commandExec(commandStr, cwdPath) {
  let options = {
    stdio: 'inherit',
    shell: true
  };
  if (!!cwdPath) options.cwd = cwdPath;
  return new Promise((resolve, reject) => {
    const child = child_process.spawn(`${commandStr}`, options);
    child.on('close', code => {
      if (code !== 0) {
        reject({
          command: ``
        });
        return;
      }
      resolve();
    });
  });
}

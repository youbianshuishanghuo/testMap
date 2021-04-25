const child_process = require('child_process');
const path = require('path');
const fs = require('fs');
const account = process.argv.slice(2)[0]; //账号

try {
  imageUpload();
} catch (err) {
  console.log(`process ${err}`);
}

async function imageUpload() {
  if (!account) {
    console.log('请输入(reg.htres.cn)镜像仓库账户名称!!!');
    return;
  }
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageObj = JSON.parse(fs.readFileSync(packageJsonPath));
  const fileName = packageObj.name;

  commandExec(`docker login --username=${account} reg.htres.cn`).then(result => {
    commandExec(`docker rmi reg.htres.cn/${account}/${fileName}:latest`).then(
        result => {},
        error => {}
      );
      commandExec(`docker build -t reg.htres.cn/${account}/${fileName}:latest .`).then(async res => {
        await commandExec(`docker push reg.htres.cn/${account}/${fileName}:latest`);
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

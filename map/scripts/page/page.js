const modules = require("../../config/module");
const fs = require("fs");
const path = require("path");

if (modules.length > 0) {
  for (let srcModule of modules) {
    let { name, title } = srcModule;
    const pageDir = path.join(process.cwd(), "src", `page/${name}`);
    const componentDir = path.join(pageDir, "component");
    const sassFile = path.join(pageDir, "app.scss");
    const moduleFile = path.join(pageDir, "index.tsx");
    const containerFile = path.join(pageDir, "App.tsx");

    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir);
    }

    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir);
    }

    if (!fs.existsSync(sassFile)) {
      fs.writeFileSync(sassFile, "", "utf8");
    }

    if (!fs.existsSync(moduleFile)) {
      let moduleContent = fs.readFileSync(path.join(__dirname, "template-module.txt"), "utf8");
      fs.writeFileSync(moduleFile, moduleContent, "utf8");
    }

    if (!fs.existsSync(containerFile)) {
      let container = fs.readFileSync(path.join(__dirname, "template-container.txt"), "utf8");
      fs.writeFileSync(containerFile, container, "utf8");
    }
  }
}
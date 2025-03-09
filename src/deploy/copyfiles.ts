import fs from 'fs';
import path from 'path';

const srcDir = path.join(__dirname, '../views');
const destDir = path.join(__dirname, '../../dist/views');


function copyFiles(src: string, dest: string) {

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  fs.readdirSync(src).forEach((file) => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);

    if (fs.statSync(srcFile).isDirectory()) {

      copyFiles(srcFile, destFile);
    } else {

      fs.copyFileSync(srcFile, destFile);
    }
  });
}

copyFiles(srcDir, destDir);

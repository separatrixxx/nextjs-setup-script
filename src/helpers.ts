import * as fs from 'fs';
import * as path from 'path';


export const replaceInFiles = (filePath: string, name: string) => {
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      const items = fs.readdirSync(filePath);
      items.forEach(item => {
        replaceInFiles(path.join(filePath, item), name);
      });
    } else if (stats.isFile()) {
      const content = fs.readFileSync(filePath, 'utf8');
      const newContent = content.replace(/\$spec\$/g, name);
      fs.writeFileSync(filePath, newContent, 'utf8');
    }
};
  
export const copyRecursiveSync = (src: string, dest: string) => {
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      fs.readdirSync(src).forEach(childItemName => {
        copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
      });
    } else if (stats.isFile()) {
      fs.copyFileSync(src, dest);
    }
};

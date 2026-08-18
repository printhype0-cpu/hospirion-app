const fs = require('fs');
const path = require('path');
const files = fs.readdirSync('./screens').filter(f => f.endsWith('.tsx'));
files.forEach(f => {
  const p = path.join('./screens', f);
  let c = fs.readFileSync(p, 'utf-8');
  if (c.includes('SafeAreaView') && c.includes('react-native') && !c.includes('react-native-safe-area-context')) {
    c = c.replace(/,\s*SafeAreaView/g, '');
    c = c.replace(/SafeAreaView,\s*/g, '');
    c = `import { SafeAreaView } from 'react-native-safe-area-context';\n` + c;
    fs.writeFileSync(p, c);
    console.log('Fixed', f);
  }
});

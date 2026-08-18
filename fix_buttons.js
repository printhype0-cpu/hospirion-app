const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'screens');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(f => {
  const p = path.join(dir, f);
  let c = fs.readFileSync(p, 'utf-8');
  let changed = false;

  // Add Alert to imports if not present and if we are going to use it
  if (!c.includes('Alert') && c.includes('react-native')) {
    c = c.replace(/import\s+{([^}]+)}\s+from\s+'react-native';/, (match, p1) => {
      if (!p1.includes('Alert')) {
        return `import { ${p1}, Alert } from 'react-native';`;
      }
      return match;
    });
  }

  // Replace <TouchableOpacity> without onPress
  // We need to be careful with regex.
  // Match <TouchableOpacity not followed by onPress inside its attributes
  const regex = /<TouchableOpacity(?![^>]*onPress=)([^>]*)>/g;
  if (regex.test(c)) {
    c = c.replace(regex, `<TouchableOpacity onPress={() => Alert.alert('Coming Soon', 'This action will be fully functional in the next update!')}$1>`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(p, c);
    console.log('Fixed', f);
  }
});

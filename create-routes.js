const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'app');
const routes = ['history', 'grouplancing', 'takanesh', 'liquidity', 'risks', 'team', 'import', 'apisettings'];

routes.forEach(route => {
  const routePath = path.join(baseDir, route);
  if (!fs.existsSync(routePath)) {
    fs.mkdirSync(routePath, { recursive: true });
    console.log(`✓ Created ${routePath}`);
  }
});

console.log('All route directories created');

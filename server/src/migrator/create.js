const fs = require('fs');
const path = require('path');
const date = require('../helpers/date');

const createMigration = async () => {
  const fileName = `${date().valueOf()}.js`;
  fs.writeFileSync(path.join(__dirname, `../migrations/${fileName}`), 'iii');
};

createMigration();
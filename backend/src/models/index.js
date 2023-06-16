'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/db_config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import Sequelize from 'sequelize';

// const models = {};
// const filename = fileURLToPath(import.meta.url);
// const dirname = path.dirname(filename);
// const basename = path.basename(filename);

// const sequelize = new Sequelize({
// 	dialect: 'sqlite',
// 	storage: path.resolve(dirname, './tmp.db'),
// });

// (async () => {
// 	const files = fs
// 		.readdirSync(dirname)
// 		.filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'));

// 	await Promise.all(files.map(async (file) => {
// 		const module = await import(path.join(dirname, file));
// 		const model = module.default(sequelize, Sequelize);
// 		models[model.name] = model;
// 	}));

// 	Object.keys(models).forEach((modelName) => {
// 		if (models[modelName].associate) {
// 			models[modelName].associate(models);
// 		}
// 	});
// })();

// export default { models, sequelize, Sequelize };
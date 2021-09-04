const sequelize = require('../config/connection');
const { Tags, Products, Catagories } = require('../models');

const tagSeedData = require('./tagSeedData.json');
const productSeedData = require('./productSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const drivers = await Driver.bulkCreate(driverSeedData);

  for (const { id } of drivers) {
    const newLicense = await License.create({
      driver_id: id,
    });
  }

  for (const car of carSeedData) {
    const newCar = await Car.create({
      ...car,
      // Attach a random driver ID to each car
      driver_id: drivers[Math.floor(Math.random() * drivers.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();

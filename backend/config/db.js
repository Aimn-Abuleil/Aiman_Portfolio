const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dpapp1_ifgk', 'aimnabuleil', 'Mb0hv6vR8rSYLq7eFIKyvvwnpeeO4N4e', {
    host: 'dpg-d411q77gi27c73d3kac0-a.oregon-postgres.render.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
});

module.exports = sequelize;

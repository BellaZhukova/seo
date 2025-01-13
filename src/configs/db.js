import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('seo', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres'
});

export default sequelize;
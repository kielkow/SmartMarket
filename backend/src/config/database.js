module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'smartmarket',
  define: {
    timeStamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

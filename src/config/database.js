const config = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'burger',
  define: {
    timespamps: true,
    underscored: true,
    underscoredAll: true,
  },
}

export default config

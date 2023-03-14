export const config = {
    connect: {
        dbName: process.env.DBNAME || "users",
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'password',

        options: {
            host: process.env.PGHOST || '127.0.0.1',
            port: process.env.PGPORT || 5432,
    
            dialect: 'postgres',
            operatorsAliases: 0,
            pool: {
              max: 5,
              min: 0,
              acquire: 3000,
              idle: 10000
            }
        }
    },

    csvfilepath: "./data/gamers-list.csv"
}
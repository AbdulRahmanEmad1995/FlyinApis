
const sql = require('mssql');

const config = {
    user: 'body',
    password: 'k9BE+x^jm9kSTZ8*',
    database: '3CX Survey Creator',
    server: '40.172.115.238',
    port:1433,  // removed \SQLEXPRESS
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

async function connectDB() {
    try {
        let pool = await sql.connect(config);
        console.log('✅ Connected to SQL Server');
        return pool;
    } catch (err) {
        console.error('❌ Database connection failed:', err);
        throw err;
    }
}

module.exports = connectDB;

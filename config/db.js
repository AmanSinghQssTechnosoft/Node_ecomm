import pkg from 'pg';
import colors from 'colors';

const { Pool } = pkg;

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres', // Your DB username
  password: 'aman', // Your DB password
  database: 'Node_ecomm', // Your DB name
});

// Test connection function
async function testConnection() {
  try {
    const client = await pool.connect();  // Get a client from the pool
    console.log(colors.bgGreen("PostgreSQL connection successful!"));
    client.release();  // Release the client back to the pool
  } catch (err) {
    console.error(colors.red("Error connecting to PostgreSQL: "), err.message);
  }
}

// Function to close the pool gracefully
async function closePool() {
  try {
    await pool.end(); // Close the pool to free resources
    console.log(colors.bgYellow("PostgreSQL connection pool closed."));
  } catch (err) {
    console.error(colors.red("Error closing PostgreSQL connection pool: "), err.message);
  }
}

// Call the testConnection function
testConnection();

// Close the pool on application exit
process.on('SIGINT', async () => {
  await closePool();
  process.exit(0); // Exit the process after closing the pool
});

export { pool };  // Export pool for use in other files

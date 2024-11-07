import { pool } from '../config/db.js';  

const createUser = async (userModel) => {
  try {
    const query = `
      INSERT INTO userModel (name, email, password, address, city, country, phone, profilepic)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const values = [
        userModel.name,
        userModel.email,
        userModel.password,
        userModel.address || null,
        userModel.city || null,
        userModel.country || null,
        userModel.phone || null,
        userModel.profilepic || null,
    ];

    const res = await pool.query(query, values);  // Use pool.query instead of client.query
    return res.rows[0]; // Return the created user
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
};

userModel.pre("save",async function(){
    this.password=await bcrypt.hash(this.password,10);
})

userModel.method.comparePassword=async function(plainPassword){
    return await bcrypt.compare(plainPassword,this.password);
};

export { createUser};

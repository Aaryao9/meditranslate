import { query } from '../../../config/db.config.js';
import { NotFoundError } from '../../../shared/exceptions/index.js';

export class UserRepository {
  async create(userData) {
    const result = await query(
      `INSERT INTO users (email, password, full_name) 
       VALUES ($1, $2, $3) 
       RETURNING id, email, full_name, created_at`,
      [userData.email, userData.password, userData.fullName]
    );
    return result.rows[0];
  }

  async findByEmail(email) {
    const result = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  }

  async findByEmailWithoutPassword(email) {
    const result = await query(
      'SELECT id, email, full_name, created_at FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  }
}

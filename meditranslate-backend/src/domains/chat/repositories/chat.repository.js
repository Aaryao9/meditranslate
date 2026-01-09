import { query } from '../../../config/db.config.js';
import { CHAT_STATUS } from '../../../shared/constants/chat.constants.js';

export class ChatRepository {
  async create(userId, title) {
    const result = await query(
      `INSERT INTO chat_sessions (user_id, title) 
       VALUES ($1, $2) 
       RETURNING *`,
      [userId, title]
    );
    return result.rows[0];
  }
}

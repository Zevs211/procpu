const template = `
import { Pool } from 'pg';

export const upsert = async (pool: Pool): Promise<void> => {
  try {
    // Write your query here
  } catch (err) {
    console.error('Error in migration:', err);
    throw err;
  }
};
`;

export default template;
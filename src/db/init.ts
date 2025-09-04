import path from 'node:path';
import fs from 'node:fs';
import { db } from './db';

export async function initializeDatabase() {
  try {
    const schemaPath = path.join(process.cwd(), 'schema.sql');
    let schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    
    schemaSQL = schemaSQL
      .replace(/AUTO_INCREMENT/g, 'AUTOINCREMENT')
      .replace(/varchar\(\d+\) CHARACTER SET utf8 COLLATE utf8_unicode_ci/g, 'TEXT')
      .replace(/datetime/g, 'TEXT')
      .replace(/ on update CURRENT_TIMESTAMP/g, '');
    
    const statements = schemaSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    for (const statement of statements) {
      if (statement) {
        await db.raw(statement);
      }
    }
    
  } catch (error) {
    console.error('error initializing database:', error);
  } finally {
    await db.destroy();
  }
}

if (require.main === module) {
  initializeDatabase();
}
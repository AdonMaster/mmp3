//language=SQL
export default `
PRAGMA foreign_keys = false;

CREATE TABLE items (
   id INTEGER PRIMARY KEY,
   user_id TEXT NOT NULL,
   category TEXT,
   created_at DATETIME,
   updated_at DATETIME,
   img INTEGER,
   thumb INTEGER,
   obs TEXT
);

CREATE INDEX idx_user_id ON items (user_id);

CREATE INDEX idx_category ON items (category);

PRAGMA foreign_keys = true;
PRAGMA user_version = 3;
`
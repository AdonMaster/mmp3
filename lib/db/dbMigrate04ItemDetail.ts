//language=SQL
export default `
PRAGMA foreign_keys = false;

CREATE TABLE item_detail (
    id INTEGER PRIMARY KEY,
    item_id INTEGER NOT NULL,
    chave TEXT,
    valor TEXT,
    position INTEGER
);
CREATE INDEX idx_item_id ON item_detail (item_id);

PRAGMA foreign_keys = true;
PRAGMA user_version = 4;
`
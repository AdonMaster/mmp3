//language=SQL
export default `
PRAGMA journal_mode = 'wal';
PRAGMA foreign_keys = false;

CREATE TABLE "users" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "name" TEXT,
  "avatar" INTEGER,
  "phone" TEXT,
  "city" TEXT,
  "uf" TEXT,
  "insta" TEXT,
  PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "email"
ON "users" (
    "email" ASC
);

PRAGMA foreign_keys = true;
PRAGMA user_version = 1;
`
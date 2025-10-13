//language=SQL
export default `
PRAGMA foreign_keys = false;

CREATE TABLE "media" (
  "id" INTEGER PRIMARY KEY,
  "owner" TEXT,
  "uri" TEXT NOT NULL,
  "server" TEXT NOT NULL,
  "type" TEXT NOT NULL
);

CREATE INDEX "owner"
ON "media" (
  "owner" ASC
);

PRAGMA foreign_keys = true;
PRAGMA user_version = 2;
`
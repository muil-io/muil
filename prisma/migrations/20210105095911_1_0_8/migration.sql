/*
  Warnings:

  - You are about to alter the column `createdAt` on the `ApiKeys` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - The migration will change the primary key for the `Logs` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `datetime` on the `Logs` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ApiKeys" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "apiKeyHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" TEXT NOT NULL,
    "enabled" INTEGER NOT NULL,
    PRIMARY KEY ("id")
);
INSERT INTO "new_ApiKeys" ("name", "id", "apiKeyHash", "createdAt", "projectId", "enabled") SELECT "name", "id", "apiKeyHash", "createdAt", "projectId", "enabled" FROM "ApiKeys";
DROP TABLE "ApiKeys";
ALTER TABLE "new_ApiKeys" RENAME TO "ApiKeys";
CREATE TABLE "new_Logs" (
    "id" TEXT NOT NULL,
    "datetime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "from" TEXT,
    "to" TEXT,
    "cc" TEXT,
    "bcc" TEXT,
    "subject" TEXT,
    "errorMessage" TEXT,
    PRIMARY KEY ("id")
);
INSERT INTO "new_Logs" ("id", "datetime", "projectId", "branch", "templateId", "type", "status", "from", "to", "cc", "bcc", "subject", "errorMessage") SELECT "id", "datetime", "projectId", "branch", "templateId", "type", "status", "from", "to", "cc", "bcc", "subject", "errorMessage" FROM "Logs";
DROP TABLE "Logs";
ALTER TABLE "new_Logs" RENAME TO "Logs";
CREATE TABLE "new_Projects" (
    "id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "hostname" TEXT,
    PRIMARY KEY ("id")
);
INSERT INTO "new_Projects" ("id", "name", "plan", "hostname") SELECT "id", "name", "plan", "hostname" FROM "Projects";
DROP TABLE "Projects";
ALTER TABLE "new_Projects" RENAME TO "Projects";
CREATE TABLE "new_Users" (
    "id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "projectId" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    PRIMARY KEY ("id")
);
INSERT INTO "new_Users" ("id", "email", "password", "name", "projectId") SELECT "id", "email", "password", "name", "projectId" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users.email_unique" ON "Users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

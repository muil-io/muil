-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "projectId" TEXT NOT NULL,
    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiKeys" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "apiKeyHash" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "enabled" INTEGER NOT NULL,
    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "hostname" TEXT,
    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "datetime" TEXT NOT NULL,
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
    "errorMessage" TEXT
);

-- CreateTable
CREATE TABLE "Smtp" (
    "projectId" TEXT NOT NULL,
    "defaultFrom" TEXT,
    "host" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "pass" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "secure" INTEGER NOT NULL,
    PRIMARY KEY ("projectId")
);

-- CreateTable
CREATE TABLE "CloudStorage" (
    "projectId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "awsBucketName" TEXT,
    "awsAccessKeyId" TEXT,
    "awsSecretAccessKey" TEXT,
    "cloudinaryFolder" TEXT,
    "cloudinaryCloudName" TEXT,
    "cloudinaryApiKey" TEXT,
    "cloudinaryApiSecret" TEXT,
    PRIMARY KEY ("projectId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users.email_unique" ON "Users"("email");

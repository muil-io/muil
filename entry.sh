#!/bin/sh
set -e

mkdir -p templates;
mkdir -p db;

if [ ! -f "/app/db/muil.db" ]; then
  sqlite3 ./db/muil.db "VACUUM;"
  npx prisma db push --preview-feature
fi

node ./apps/api/src/main;
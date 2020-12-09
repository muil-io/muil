#!/bin/sh
set -e

mkdir -p templates;

if [ ! -d db ]; then
  mkdir db;
  sqlite3 ./db/muil.db "VACUUM;"
  npx prisma db push --preview-feature
fi

node ./apps/api/src/main;
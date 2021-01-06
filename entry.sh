#!/bin/sh
set -e

mkdir -p templates;
mkdir -p db;

if [ ! -f "/app/db/muil.db" ]; then
  sqlite3 ./db/muil.db "VACUUM;"
  npx prisma db push --preview-feature
else
  npx prisma migrate resolve --applied "20210105095759_base" --preview-feature || true
  npx prisma migrate deploy --preview-feature
fi

node ./apps/api/src/main;
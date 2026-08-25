#!/usr/bin/env bash
set -e

# Start Postgres in the background using official entrypoint
docker-entrypoint.sh postgres &

# Wait until Postgres is online and accepting connections
until pg_isready -h localhost -U "${POSTGRES_USER}" -d "${POSTGRES_DB}"; do
  echo "Waiting for PostgreSQL to start..."
  sleep 1
done

echo "PostgreSQL is ready! Executing init script..."

# FIXED: Ensure absolute path to /scripts/init.sql
psql -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" -f /scripts/init.sql

# Keep background process alive
wait -n
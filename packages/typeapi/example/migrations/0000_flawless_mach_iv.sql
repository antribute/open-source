CREATE TABLE IF NOT EXISTS "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"isCompleted" boolean DEFAULT false,
	"name" text NOT NULL
);

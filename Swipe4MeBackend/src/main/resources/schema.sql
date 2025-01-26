CREATE TABLE IF NOT EXISTS "users" (
  "id" bigserial PRIMARY KEY NOT NULL,
  "first_name" varchar(100) NOT NULL,
  "last_name" varchar(100) NOT NULL,
  "email" varchar(100) NOT NULL,
  "phone_number" varchar(50) NOT NULL,
  "is_buyer" smallint NOT NULL,
  "rating" float
);

CREATE TABLE IF NOT EXISTS "transactions" (
  "id" bigserial PRIMARY KEY NOT NULL,
  "location" smallint NOT NULL,
  "time" timestamp NOT NULL,
  "buyer_id" bigint NOT NULL,
  "seller_id" bigint NOT NULL,
  "status" smallint NOT NULL
);

ALTER TABLE "transactions" ADD FOREIGN KEY ("buyer_id") REFERENCES "users" ("id");

ALTER TABLE "transactions" ADD FOREIGN KEY ("seller_id") REFERENCES "users" ("id");

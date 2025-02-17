CREATE TABLE IF NOT EXISTS "users"
(
    "id"           bigserial PRIMARY KEY NOT NULL,
    "first_name"   varchar(100)          NOT NULL,
    "last_name"    varchar(100)          NOT NULL,
    "email"        varchar(100)          NOT NULL,
    "phone_number" varchar(50),
    "rating"       float
);

CREATE TABLE IF NOT EXISTS "transactions"
(
    "id"        bigserial PRIMARY KEY NOT NULL,
    "location"  smallint              NOT NULL,
    "time"      timestamp             NOT NULL,
    "buyer_id"  bigint                NOT NULL,
    "seller_id" bigint                NOT NULL,
    "status"    smallint              NOT NULL
);

CREATE TABLE IF NOT EXISTS "ratings"
(
    "id"      bigserial PRIMARY KEY NOT NULL,
    "from"    bigint                NOT NULL,
    "to"      bigint                NOT NULL,
    "rating"  float,
    "comment" text
);

CREATE TABLE IF NOT EXISTS "active_users"
(
    "id"         bigserial PRIMARY KEY NOT NULL,
    "user_id"    bigint                NOT NULL,
    "location"   smallint              NOT NULL,
    "start_time" timestamp             NOT NULL,
    "end_time"   timestamp             NOT NULL
);

CREATE INDEX ON "ratings" ("user_id");

ALTER TABLE "transactions"
    ADD FOREIGN KEY ("buyer_id") REFERENCES "users" ("id");

ALTER TABLE "transactions"
    ADD FOREIGN KEY ("seller_id") REFERENCES "users" ("id");

ALTER TABLE "ratings"
    ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "active_users"
    ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

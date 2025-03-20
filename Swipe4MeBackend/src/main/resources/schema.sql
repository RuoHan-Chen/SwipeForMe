-- Authors: Steven Yi, Xinying Luo
-- Time spent: 1 hour

CREATE TABLE IF NOT EXISTS "users"
(
    "id"              bigserial PRIMARY KEY NOT NULL,
    "first_name"      varchar(100)          NOT NULL,
    "last_name"       varchar(100)          NOT NULL,
    "email"           varchar(100)          NOT NULL,
    "phone_number"    varchar(50),
    "profile_pic_url" text,
    "rating"          float
);

CREATE TABLE IF NOT EXISTS "transactions"
(
    "id"              bigserial PRIMARY KEY NOT NULL,
    "availability_id" bigint                NOT NULL,
    "buyer_id"        bigint                NOT NULL,
    "seller_id"       bigint                NOT NULL,
    "status"          varchar(100)          NOT NULL
);

CREATE TABLE IF NOT EXISTS "ratings"
(
    "r_id"             bigserial PRIMARY KEY NOT NULL,
    "seller_id"        bigint                NOT NULL,
    "buyer_id"         bigint                NOT NULL,
    "to_seller_rating" float default (5.0),
    "to_buyer_rating"  float default (5.0)
);

CREATE TABLE IF NOT EXISTS "availabilities"
(
    "id"         bigserial PRIMARY KEY NOT NULL,
    "user_id"    bigint                NOT NULL,
    "location"   varchar(100)          NOT NULL,
    "start_time" timestamptz           NOT NULL,
    "end_time"   timestamptz           NOT NULL
);

CREATE INDEX ON "ratings" ("seller_id");

CREATE INDEX ON "ratings" ("buyer_id");

ALTER TABLE "transactions"
    ADD FOREIGN KEY ("buyer_id") REFERENCES "users" ("id");

ALTER TABLE "transactions"
    ADD FOREIGN KEY ("seller_id") REFERENCES "users" ("id");

ALTER TABLE "transactions"
    ADD FOREIGN KEY ("availability_id") REFERENCES "availabilities" ("id");

ALTER TABLE "ratings"
    ADD FOREIGN KEY ("buyer_id") REFERENCES "users" ("id");

ALTER TABLE "ratings"
    ADD FOREIGN KEY ("seller_id") REFERENCES "users" ("id");

ALTER TABLE "availabilities"
    ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

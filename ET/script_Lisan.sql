
PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;

-- Table: auth_group
CREATE TABLE "auth_group" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" varchar(150) NOT NULL UNIQUE
);
INSERT INTO "auth_group" VALUES (1,'Admin');

-- Table: auth_group_permissions
CREATE TABLE "auth_group_permissions" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "group_id" integer NOT NULL REFERENCES "auth_group" ("id") DEFERRABLE INITIALLY DEFERRED,
    "permission_id" integer NOT NULL REFERENCES "auth_permission" ("id") DEFERRABLE INITIALLY DEFERRED
);
INSERT INTO "auth_group_permissions" VALUES (1,1,1);

-- Table: auth_permission
CREATE TABLE "auth_permission" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" varchar(255) NOT NULL,
    "content_type_id" integer NOT NULL REFERENCES "django_content_type" ("id") DEFERRABLE INITIALLY DEFERRED,
    "codename" varchar(100) NOT NULL
);
INSERT INTO "auth_permission" VALUES (1,'Can add log entry',1,'add_logentry');

-- Table: auth_user
CREATE TABLE "auth_user" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "password" varchar(128) NOT NULL,
    "last_login" datetime NULL,
    "is_superuser" bool NOT NULL,
    "username" varchar(150) NOT NULL UNIQUE,
    "first_name" varchar(150) NOT NULL,
    "last_name" varchar(150) NOT NULL,
    "email" varchar(254) NOT NULL,
    "is_staff" bool NOT NULL,
    "is_active" bool NOT NULL,
    "date_joined" datetime NOT NULL
);
INSERT INTO "auth_user" VALUES (1,'pbkdf2_sha256$260000$0CfZ41U51eGh$zpK/5xV8oUglkeD6t02PhxlJ3h7Xt+O9RDJ3T/vv8w4=',
'2023-01-01 00:00:00',1,'admin','Admin','User','admin@example.com',1,1,'2023-01-01 00:00:00');

-- Table: auth_user_groups
CREATE TABLE "auth_user_groups" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" integer NOT NULL REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED,
    "group_id" integer NOT NULL REFERENCES "auth_group" ("id") DEFERRABLE INITIALLY DEFERRED
);
INSERT INTO "auth_user_groups" VALUES (1,1,1);

-- Table: auth_user_user_permissions
CREATE TABLE "auth_user_user_permissions" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" integer NOT NULL REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED,
    "permission_id" integer NOT NULL REFERENCES "auth_permission" ("id") DEFERRABLE INITIALLY DEFERRED
);
INSERT INTO "auth_user_user_permissions" VALUES (1,1,1);

-- Table: public_libro
CREATE TABLE "public_libro" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" varchar(100) NOT NULL,
    "autor" varchar(100) NOT NULL,
    "fecha_publicacion" date NOT NULL,
    "fecha_recibo" date NOT NULL,
    "usuario_id" integer NOT NULL REFERENCES "public_user" ("id") DEFERRABLE INITIALLY DEFERRED
);
INSERT INTO "public_libro" VALUES (1, 'Libro 1', 'Autor 1', '2023-01-01', '2023-01-02', 1);

-- Table: public_user
CREATE TABLE "public_user" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" varchar(50) NOT NULL,
    "last_name" varchar(50) NOT NULL,
    "email" varchar(254) NOT NULL UNIQUE,
    "password" varchar(128) NOT NULL
);
INSERT INTO "public_user" VALUES (1, 'First', 'Last', 'user@example.com', 'pbkdf2_sha256$260000$abcdef$1234567890abcdef');

COMMIT;

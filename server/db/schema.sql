-- Hospital website schema for Hostinger MariaDB / MySQL
-- Import via phpMyAdmin (Import tab) or: mysql -u USER -p DBNAME < schema.sql
-- Only dynamic data lives here. Doctors, services, gallery and hospital info
-- are static content in the frontend repo.

SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS `appointments` (
  `id`             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`           VARCHAR(120)  NOT NULL,
  `phone`          VARCHAR(20)   NOT NULL,
  `email`          VARCHAR(160)  NULL,
  `preferred_date` DATE          NOT NULL,
  `preferred_time` VARCHAR(20)   NULL,
  `doctor_key`     VARCHAR(60)   NULL,
  `service_key`    VARCHAR(60)   NULL,
  `message`        TEXT          NULL,
  `status`         ENUM('new','confirmed','completed','cancelled') NOT NULL DEFAULT 'new',
  `created_at`     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_appointments_status` (`status`),
  KEY `idx_appointments_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `feedback` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`        VARCHAR(120) NOT NULL,
  `rating`      TINYINT UNSIGNED NOT NULL,
  `message`     TEXT         NOT NULL,
  `is_approved` TINYINT(1)   NOT NULL DEFAULT 0,
  `created_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_feedback_approved` (`is_approved`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `admin_users` (
  `id`            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username`      VARCHAR(60)  NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role`          VARCHAR(30)  NOT NULL DEFAULT 'admin',
  `created_at`    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_admin_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create the first admin with: npm run create-admin -- <username> <password>
-- (never insert plaintext passwords here)

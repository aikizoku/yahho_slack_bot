
DROP TABLE lunchs;
CREATE TABLE IF NOT EXISTS lunchs (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `category` VARCHAR(10) NOT NULL, 
  `type` enum('near', 'heavy', 'cafe') NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
COMMENT "ランチ";

module.exports = {
  up: "CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT, UNIQUE KEY id (id), name VARCHAR (255) NOT NULL, password VARCHAR (255) NOT NULL, email VARCHAR (255) NOT NULL,  UNIQUE KEY email (email), is_admin BOOLEAN DEFAULT false, created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)",
  down: "TRUNCATE TABLE  users",
};

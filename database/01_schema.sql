DROP TABLE IF EXISTS `session`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
	id INT AUTO_INCREMENT NOT NULL,
	username VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY (id),
	CONSTRAINT users_username_unique UNIQUE (username)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4;

CREATE TABLE `session` (
	id INT AUTO_INCREMENT NOT NULL,
	session_id CHAR(128) NOT NULL,
	user_id INT NOT NULL,
	expiration_date DATETIME NOT NULL,
	CONSTRAINT session_pk PRIMARY KEY (id),
	CONSTRAINT session_user_fk FOREIGN KEY (user_id)
		REFERENCES users(id)
		ON DELETE CASCADE,
	CONSTRAINT session_session_id_unique UNIQUE (session_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4;
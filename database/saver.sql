
CREATE TABLE saver_db.`session` (
	id INT auto_increment NOT NULL,
	session_id varchar(100) NOT NULL,
	expiration_date varchar(100) NULL,
	CONSTRAINT session_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4;

CREATE TABLE saver_db.users (
	id INT auto_increment NOT NULL,
	username varchar(100) NOT NULL,
	password varchar(100) NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4;
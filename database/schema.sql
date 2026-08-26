--  User table
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(255)
);
-- Project table
CREATE TABLE IF NOT EXISTS projects (
    project_id SERIAL PRIMARY KEY,
    project_path VARCHAR(255) UNIQUE NOT NULL
);


--  Binding tables
CREATE TABLE IF NOT EXISTS users_to_projects (
    user_id INT NOT NULL,
    project_id INT NOT NULL,

    PRIMARY KEY (user_id, project_id), -- Corrected Composite Primary Key
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

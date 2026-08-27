CREATE OR REPLACE FUNCTION get_specific_user(p_username VARCHAR(255))
RETURNS TABLE (user_id INT, username VARCHAR, token VARCHAR)
LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY 
        SELECT 
            u.user_id,
            u.username,
            u.token
        FROM users u
        WHERE
            u.username = p_username;
END;
$$;

DROP FUNCTION IF EXISTS get_user_by_id(integer);
CREATE OR REPLACE FUNCTION get_user_by_id(p_user_id INT)
RETURNS TABLE (user_id INT, username VARCHAR, token VARCHAR)
LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY 
        SELECT 
            u.user_id,
            u.username,
            u.token
        FROM users u
        WHERE
            u.user_id = p_user_id;
END;
$$;
CREATE OR REPLACE FUNCTION create_user(
    p_username VARCHAR(255),
    p_password VARCHAR(255)
)
RETURNS TABLE (user_id INT, username VARCHAR)
LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY 
        INSERT INTO users (username, password)
        VALUES (p_username, p_password)
        RETURNING users.user_id, users.username;
END;
$$;

CREATE OR REPLACE FUNCTION get_user_password(
    p_username VARCHAR(255)
)
RETURNS TABLE (password VARCHAR)
LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    SELECT
        u.password
    FROM
        users u
    WHERE
        u.username = p_username;
END;
$$;
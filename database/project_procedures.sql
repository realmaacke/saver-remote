DROP FUNCTION IF EXISTS create_project;

CREATE OR REPLACE FUNCTION create_project(
    p_username VARCHAR(255),
    p_project_name VARCHAR(255)
)
RETURNS TABLE (project_id INT, project_name VARCHAR(255))
LANGUAGE plpgsql AS $$
DECLARE
    v_user_id INT;
    v_project_id INT;
BEGIN
    -- Retrive User id
    SELECT u.user_id INTO v_user_id
    FROM users u
    WHERE u.username = p_username;

    -- Exception if user id does not exist.
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'User % not found', p_username;
    END IF;

    -- Creates project
    INSERT INTO projects (project_name)
    VALUES (p_project_name)
    RETURNING projects.project_id INTO v_project_id;

    -- Exception if project id does not exist.
    IF v_project_id IS NULL THEN
        RAISE EXCEPTION 'Project % not created', p_project_name;
    END IF;

    -- Inserts user + project into shared table
    INSERT INTO users_to_projects (user_id, project_id)
    VALUES (v_user_id, v_project_id);

    -- Returns project id + project_name.
    RETURN QUERY
    SELECT
        p.project_id, p.project_name
    FROM
        projects p
    WHERE p.project_id = v_project_id; 
END;
$$;
/* I have used Grok (AI tool) to create this file based on the definitions.ts file. */

CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE columns (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    column_name VARCHAR(255) NOT NULL,
    column_index INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

ALTER TABLE columns ADD CONSTRAINT unique_column_index_per_user UNIQUE (user_id, column_index);

CREATE TABLE todos (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    column_id UUID NOT NULL,
    task TEXT NOT NULL,
    todo_index INTEGER NOT NULL,
    done BOOLEAN NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (column_id) REFERENCES columns(id) ON DELETE CASCADE
);

ALTER TABLE todos ADD CONSTRAINT unique_todo_index_per_column UNIQUE (column_id, todo_index);

CREATE INDEX idx_columns_user_id ON columns(user_id);
CREATE INDEX idx_todos_user_id ON todos(user_id);
CREATE INDEX idx_todos_column_id ON todos(column_id);
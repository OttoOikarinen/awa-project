/* I have used Grok (AI tool) to create this file based on the definitions.ts file. */
/* Run this file to create the database on your device. */

CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN
);

CREATE TABLE columns (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    column_name VARCHAR(255) NOT NULL,
    column_index INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

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

CREATE INDEX idx_columns_user_id ON columns(user_id);
CREATE INDEX idx_todos_user_id ON todos(user_id);
CREATE INDEX idx_todos_column_id ON todos(column_id);
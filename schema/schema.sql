CREATE SEQUENCE id_sequence;
CREATE OR REPLACE FUNCTION id_generator(
    out new_id BIGINT
) AS $$
DECLARE
    our_epoch BIGINT := 1072915200000;
    seq_id BIGINT;
    now_ms BIGINT;
    shard_id INT := 1;
BEGIN
    SELECT NEXTVAL('id_sequence') % 1024 INTO seq_id;
    SELECT FLOOR(EXTRACT(EPOCH FROM now()) * 1000) INTO now_ms;
    new_id := (now_ms - our_epoch) << 23;
    new_id := new_id | (shard_id << 10);
    new_id := new_id | (seq_id);
END;
$$
LANGUAGE PLPGSQL;

CREATE TABLE users (
    id BIGINT PRIMARY KEY NOT NULL DEFAULT id_generator(),
    username VARCHAR(35) UNIQUE NOT NULL,
    first_name VARCHAR(25),
    last_name VARCHAR(25),
    birth_date TIMESTAMP DEFAULT NULL,
    email VARCHAR(65) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    date_updated TIMESTAMP DEFAULT now() NOT NULL,
    date_deleted TIMESTAMP DEFAULT NULL,
    status VARCHAR(10) DEFAULT 'active',
    verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE user_profiles (
    id BIGINT PRIMARY KEY NOT NULL DEFAULT id_generator(),
    user_id BIGINT REFERENCES users(id) UNIQUE NOT NULL,
    username TEXT REFERENCES users(username) UNIQUE NOT NULL,
    avatar TEXT DEFAULT 'https://puu.sh/qlsJY/72d9b9920c.jpg'
);

CREATE TABLE user_sessions (
    session_key TEXT PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) NOT NULL,
    login_time TIMESTAMP NOT NULL,
    last_seen_time TIMESTAMP NOT NULL
);

CREATE TABLE beta_signups (
    email VARCHAR(65) UNIQUE NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE portfolios (
    id BIGINT PRIMARY KEY NOT NULL DEFAULT id_generator(),
    user_id BIGINT REFERENCES users(id) NOT NULL,
    name VARCHAR(25) DEFAULT 'Portfolio',
    funds DECIMAL DEFAULT 100000,
    date_created TIMESTAMP DEFAULT now(),
    date_updated TIMESTAMP DEFAULT now(),
    date_deleted TIMESTAMP DEFAULT NULL,
    status VARCHAR(10) DEFAULT 'active'
);

CREATE TABLE watchlist (
    id BIGINT PRIMARY KEY NOT NULL DEFAULT id_generator(),
    user_id BIGINT REFERENCES users(id) NOT NULL,
    name VARCHAR(25) DEFAULT 'Watchlist',
    date_created TIMESTAMP DEFAULT now(),
    date_updated TIMESTAMP DEFAULT now(),
    date_deleted TIMESTAMP DEFAULT NULL
);

CREATE TABLE stocks (
    id BIGINT PRIMARY KEY NOT NULL DEFAULT id_generator(),
    user_id BIGINT REFERENCES users(id) NOT NULL,
    portfolio_id BIGINT REFERENCES portfolios(id) NOT NULL,
    symbol VARCHAR(20) NOT NULL,
    shares INTEGER DEFAULT 0,
    date_created TIMESTAMP DEFAULT now(),
    date_updated TIMESTAMP DEFAULT now(),
    date_deleted TIMESTAMP DEFAULT NULL
);

CREATE TABLE stock_transactions (
    id BIGINT PRIMARY KEY NOT NULL DEFAULT id_generator(),
    user_id BIGINT REFERENCES users(id) NOT NULL,
    portfolio_id BIGINT REFERENCES portfolios(id) NOT NULL,
    stock_id BIGINT REFERENCES stocks(id) NOT NULL,
    buy_date TIMESTAMP,
    sell_date TIMESTAMP,
    buy_price DECIMAL,
    sell_price DECIMAL
);

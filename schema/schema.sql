CREATE SEQUENCE id_sequence;
CREATE OR REPLACE FUNCTION id_generator(
    OUT new_id BIGINT
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
    birth_date TIMESTAMPTZ DEFAULT NULL,
    email VARCHAR(65) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    date_created TIMESTAMPTZ DEFAULT now(),
    date_updated TIMESTAMPTZ DEFAULT now() NOT NULL,
    date_deleted TIMESTAMPTZ DEFAULT NULL,
    last_login TIMESTAMPTZ DEFAULT now() NOT NULL,
    status VARCHAR(10) DEFAULT 'new',
    verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) UNIQUE NOT NULL,
    username TEXT REFERENCES users(username) UNIQUE NOT NULL,
    avatar TEXT DEFAULT 'https://puu.sh/qlsJY/72d9b9920c.jpg',
    bio TEXT DEFAULT 'Random information about me.',
    date_created TIMESTAMPTZ DEFAULT now(),
    date_updated TIMESTAMPTZ DEFAULT now() NOT NULL,
    date_deleted TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE watchlists (
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) NOT NULL,
    name VARCHAR(25) DEFAULT 'Watchlist',
    date_created TIMESTAMPTZ DEFAULT now(),
    date_updated TIMESTAMPTZ DEFAULT now(),
    date_deleted TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE watchlist_stocks (
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) NOT NULL,
    watchlist_id BIGINT REFERENCES watchlists(id) NOT NULL,
    symbol VARCHAR(20) NOT NULL,
    date_created TIMESTAMPTZ DEFAULT now(),
    date_updated TIMESTAMPTZ DEFAULT now(),
    date_deleted TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE portfolios (
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) NOT NULL,
    name VARCHAR(25) DEFAULT 'Portfolio',
    funds DECIMAL DEFAULT 100000,
    date_created TIMESTAMPTZ DEFAULT now(),
    date_updated TIMESTAMPTZ DEFAULT now(),
    date_deleted TIMESTAMPTZ DEFAULT NULL,
    status VARCHAR(10) DEFAULT 'active'
);

CREATE TABLE stocks (
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) NOT NULL,
    portfolio_id BIGINT REFERENCES portfolios(id) NOT NULL,
    symbol VARCHAR(20) NOT NULL,
    shares INTEGER DEFAULT 0,
    action VARCHAR(10) NOT NULL, -- 'buy' or 'sell'
    price DECIMAL NOT NULL,
    date_created TIMESTAMPTZ DEFAULT now(),
    date_updated TIMESTAMPTZ DEFAULT now(),
    date_deleted TIMESTAMPTZ DEFAULT NULL
);

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

CREATE TYPE user_status AS ENUM ('NEW', 'ACTIVE', 'DEACTIVATED', 'BANNED');

CREATE TABLE users (
  id BIGINT PRIMARY KEY NOT NULL DEFAULT id_generator(),
  email VARCHAR(65) UNIQUE NOT NULL,
  username VARCHAR(35) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  first_name VARCHAR(55),
  last_name VARCHAR(55),
  birthday TIMESTAMPTZ DEFAULT NULL,
  avatar_url TEXT DEFAULT 'https://puu.sh/qlsJY/72d9b9920c.jpg',
  bio VARCHAR(255),
  last_login TIMESTAMPTZ DEFAULT now() NOT NULL,
  status user_status DEFAULT 'NEW',
  verified BOOLEAN DEFAULT FALSE,
  date_created TIMESTAMPTZ DEFAULT now(),
  date_updated TIMESTAMPTZ DEFAULT now() NOT NULL,
  date_deleted TIMESTAMPTZ DEFAULT NULL
);

CREATE TYPE account_membership AS ENUM ('FREE', 'TIER_ONE', 'TIER_TWO');

CREATE TABLE account_settings (
  id BIGINT PRIMARY KEY NOT NULL DEFAULT id_generator(),
  user_id BIGINT REFERENCES users(id) UNIQUE NOT NULL,
  notification_alerts BOOLEAN DEFAULT TRUE,
  membership account_membership DEFAULT 'FREE',
  date_created TIMESTAMPTZ DEFAULT now(),
  date_updated TIMESTAMPTZ DEFAULT now() NOT NULL,
  date_deleted TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE symbols (
  id SERIAL PRIMARY KEY,
  symbol VARCHAR(15) UNIQUE NOT NULL,
  exchange VARCHAR(155) NOT NULL,
  upvotes INTEGER DEFAULT 1,
  downvotes INTEGER DEFAULT 0,
  hashtags JSON,
  date_created TIMESTAMPTZ DEFAULT now(),
  date_updated TIMESTAMPTZ DEFAULT now() NOT NULL,
  date_deleted TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE symbol_comments (
  id SERIAL PRIMARY KEY,
  symbol_id REFERENCES symbols(id) NOT NULL,
  user_id REFERENCES users(id) NOT NULL,
  comment TEXT NOT NULL,
  upvotes INTEGER DEFAULT 1,
  downvotes INTEGER DEFAULT 0,
  flagged BOOLEAN DEFAULT FALSE,
  date_created TIMESTAMPTZ DEFAULT now(),
  date_updated TIMESTAMPTZ DEFAULT now() NOT NULL,
  date_deleted TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE commodities (
  id SERIAL PRIMARY KEY,
  commodity VARCHAR(155) UNIQUE NOT NULL,
  upvotes INTEGER DEFAULT 1,
  downvotes INTEGER DEFAULT 0,
  hashtags JSON,
  date_created TIMESTAMPTZ DEFAULT now(),
  date_updated TIMESTAMPTZ DEFAULT now() NOT NULL,
  date_deleted TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE commodity_comments (
  id SERIAL PRIMARY KEY,
  symbol_id REFERENCES symbols(id) NOT NULL,
  user_id REFERENCES users(id) NOT NULL,
  comment TEXT NOT NULL,
  upvotes INTEGER DEFAULT 1,
  downvotes INTEGER DEFAULT 0,
  flagged BOOLEAN DEFAULT FALSE,
  date_created TIMESTAMPTZ DEFAULT now(),
  date_updated TIMESTAMPTZ DEFAULT now() NOT NULL,
  date_deleted TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE watchlists (
  id SERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) NOT NULL,
  name VARCHAR(25) DEFAULT 'Watchlist',
  private BOOLEAN DEFAULT FALSE,
  date_created TIMESTAMPTZ DEFAULT now(),
  date_updated TIMESTAMPTZ DEFAULT now(),
  date_deleted TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE watchlist_stocks (
  id SERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) NOT NULL,
  watchlist_id INTEGER REFERENCES watchlists(id) NOT NULL,
  symbol VARCHAR(20) NOT NULL,
  date_created TIMESTAMPTZ DEFAULT now(),
  date_updated TIMESTAMPTZ DEFAULT now(),
  date_deleted TIMESTAMPTZ DEFAULT NULL
);

CREATE TYPE portfolio_status AS ENUM ('ACTIVE', 'INACTIVE');

CREATE TABLE portfolios (
  id SERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) NOT NULL,
  name VARCHAR(25) DEFAULT 'Portfolio',
  funds DECIMAL DEFAULT 100000,
  private BOOLEAN DEFAULT TRUE,
  status portfolio_status DEFAULT 'ACTIVE',
  date_created TIMESTAMPTZ DEFAULT now(),
  date_updated TIMESTAMPTZ DEFAULT now(),
  date_deleted TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE portfolio_history (
  id SERIAL PRIMARY KEY,
  portfolio_id INTEGER REFERENCES portfolios(id) NOT NULL,
  funds DECIMAL,
  date_created TIMESTAMPTZ DEFAULT now()
);

CREATE TYPE stock_action AS ENUM ('BUY', 'SELL');

CREATE TABLE portfolio_stocks (
  id SERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) NOT NULL,
  portfolio_id INTEGER REFERENCES portfolios(id) NOT NULL,
  symbol VARCHAR(20) NOT NULL,
  shares INTEGER DEFAULT 0,
  action stock_action NOT NULL,
  price DECIMAL NOT NULL,
  date_created TIMESTAMPTZ DEFAULT now(),
  date_updated TIMESTAMPTZ DEFAULT now(),
  date_deleted TIMESTAMPTZ DEFAULT NULL
);

CREATE TYPE commodity_action AS ENUM ('BUY', 'SELL');

CREATE TABLE portfolio_commodities (
  id SERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) NOT NULL,
  portfolio_id INTEGER REFERENCES portfolios(id) NOT NULL,
  commodity VARCHAR(155) NOT NULL,
  quantity INTEGER NOT NULL,
  metric VARCHAR(25) TEXT NOT NULL,
  action commodity_action NOT NULL,
  price DECIMAL NOT NULL,
  date_created TIMESTAMPTZ DEFAULT now(),
  date_updated TIMESTAMPTZ DEFAULT now(),
  date_deleted TIMESTAMPTZ DEFAULT NULL
);

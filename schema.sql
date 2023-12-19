create schema if not exists api;

-- Tasks
create table if not exists api.task (
  id serial primary key,
  -- done boolean not null default false,
  name text not null,
  description text not null,
  sort_field integer,
  created_at timestamptz,
  updated_at timestamptz,
  deleted_at timestamptz
);


-- Comments
create table if not exists api.comment (
  id serial primary key,
  -- done boolean not null default false,
  task_comment text not null,
  task_id integer references api.task(id),
  created_at timestamptz,
  updated_at timestamptz,
  deleted_at timestamptz
);

-- In an ideal world, I'd implement some sort of basic security
create role web_anon nologin;

-- Grant everything 🙂 
grant all on schema api to web_anon;
grant all on api.comment to web_anon;
grant all on api.task to web_anon;

create role authenticator noinherit login password 'mysecretpassword';
grant web_anon to authenticator;


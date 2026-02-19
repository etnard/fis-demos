CREATE TABLE lessons (
    id uuid NOT NULL DEFAULT gen_random_uuid () primary key,
    creation_meta jsonb NOT NULL DEFAULT '{}'::jsonb,
    title text NOT NULL DEFAULT NULL,
    description text NOT NULL DEFAULT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
  );

create trigger handle_updated_at before update on lessons
for each row execute procedure moddatetime(updated_at);
INSERT INTO
  race (name, description)
VALUES
  ('Человек', 'Homo sapiens race'),
  ('Маг', 'Существа магического происхлждения');

INSERT INTO
  public.hero (name, description, hp, mp, raceid)
VALUES
  (
    'Зана',
    'Она мила, честна, любит поэзию и является, наверное, единственным обитателем Шио, который не произнес ни слова лжи.',
    20,
    15,
    1
  ),
  (
    'Нархиз',
    'Строгий и педантичный преподаватель, он стал настоящим проклятием для аколитов, собирающихся стать магами.',
    18,
    35,
    2
  ) RETURNING Id;

INSERT INTO
  public.hero (name, description, hp, mp, raceid)
VALUES
  (
    'Линна',
    'Последняя представительница рода Соколов.',
    30,
    25,
    1
  ),
  (
    'Беатрис',
    'Аббатиса Священной Империи',
    27,
    34,
    2
  ),
  (
    'Арниэль',
    'Верховный король эльфов',
    29,
    33,
    2
  );

INSERT INTO
  public.spell(name, hp)
VALUES
  ('Щит', 0),
  ('Волна смерти', 10);


-- список заклинаний для 1-го героя
INSERT INTO
  public.spell_list(spellid, heroid)
VALUES
  (3, 1),
  (4, 1)
SELECT
	id,
	name,
	description
FROM
	public.race;

SELECT
	*
FROM
	hero
ORDER BY
	name;

-- условный запрос
SELECT
	Id,
	name
FROM
	hero
WHERE
	hp > 20;

-- Вложенный запрос
SELECT
	Id,
	name
FROM
	hero
WHERE
	Id in (
		SELECT
			Id
		FROM
			hero
		WHERE
			mp < 30
	);

-- запрос с объединением (выводит названия заклинаний для героея)
SELECT
	hero.name,
	spell_list.spellId,
	spell.name
FROM
	hero
	JOIN spell_list On spell_list.heroId = hero.Id
	JOIN spell ON spell.id = spell_list.spellId
WHERE
	hero.id = 1


-- запрос с группировкой (количество героев в каждой расе)
SELECT
	hero.raceId,
	race.name,
	COUNT(*) AS ModelsCount
FROM
	hero
	JOIN race On race.id = hero.raceId
GROUP BY
	hero.raceId,
	race.name

-- агрегатные функции
SELECT
	MIN(hp) as min_hp
FROM
	hero;
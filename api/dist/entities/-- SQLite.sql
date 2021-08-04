-- SQLite
select * from person per,
(select * person_individual where per.person_id = ind.person_individual_id and per.type = 'F') ind
--left join person_company com on (per.person_id = com.--person_company_id and per.type = 'J')
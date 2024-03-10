select
    fi.file_id
  , fi.file_name
  , fi.file_date
  , (select string_agg(c.object_type, ', ') from st_config c where c.config_key = 'efd' and c.object_value like '%file%' and c.string_value = try_cast(fi.file_id as varchar)) as used_by_formats
  , fa.facility_code
from dt_file fi
left join dt_facility fa on fa.facility_id = fi.facility_id
where lower (file_type) = '.zip' and (fi.facility_id is null or equis.auth(@user_id, 4, fi.facility_id, -1) = 4)
order by fi.file_name

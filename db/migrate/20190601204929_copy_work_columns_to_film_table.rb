class CopyWorkColumnsToFilmTable < ActiveRecord::Migration[5.1]
  def change
    Work.all.each do |work|
      film = Film.create(
        title: work.title,
        secondary_title: work.secondary_title,
        alias_alternates: work.alias_alternates,

        year: work.year,
        country_id: work.country_id,
        media_type_id: work.media_type_id,

        composer_ids: work.composer_ids,
        director_ids: work.director_ids,
        orchestrator_ids: work.orchestrator_ids,
        production_company_ids: work.production_company_ids,

        created_by_id: work.created_by_id,
        updated_by_id: work.updated_by_id,
      )

      Work.update(
        work.id,
        film_id: film.id,
      )
    end
  end
end

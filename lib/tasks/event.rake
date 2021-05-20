namespace :event do
  desc 'Tasks related to creating and replaying events'

  def log(string)
    print string unless Rails.env.test?
  end

  namespace :synthetic do
    desc 'Tasks related to creating synthetic events for existing records'

    def create_event (created_by_id, event_name, entity_id, payload)
      Event.create!(
        created_by_id: created_by_id ? created_by_id : Cataloger.first.id,
        entity_id: entity_id,
        name: event_name,
        payload: payload,
        synthetic: true,
      )
    end

    task all: :environment do
      desc 'Create synthetic "create" events for all existing records'
      Rake::Task['event:synthetic:catalogers'].execute
      Rake::Task['event:synthetic:collections'].execute
      Rake::Task['event:synthetic:composers'].execute
      Rake::Task['event:synthetic:countries'].execute
      Rake::Task['event:synthetic:directors'].execute
      Rake::Task['event:synthetic:material_formats'].execute
      Rake::Task['event:synthetic:media_types'].execute
      Rake::Task['event:synthetic:production_companies'].execute
      Rake::Task['event:synthetic:repositories'].execute
      Rake::Task['event:synthetic:resources'].execute
      Rake::Task['event:synthetic:works'].execute
    end

    # Models

    task catalogers: :environment do
      desc 'Create synthetic "create" events for all catalogers'

      records = Cataloger.all
      log "\nCreating event logs for #{records.count} catalogers"
      ActiveRecord::Base.transaction do
        records.each do |record|
          payload = {
            name: record.name,
            email: record.email,
            description: record.description,
            admin: record.admin,
          }
          create_event(record.created_by_id, 'CreateCataloger', record.id, payload)
          log '.'
        end
      end
      log "\nAll done with catalogers!"
    end

    task collections: :environment do
      desc 'Create synthetic "create" events for all collections'

      records = Collection.all
      log "\nCreating event logs for #{records.count} collections"
      ActiveRecord::Base.transaction do
        records.each do |record|
          payload = {
            name: record.name,
            description: record.description,
            finding_aid_link: record.finding_aid_link,
            repository_id: record.repository_id,
          }
          create_event(record.created_by_id, 'CreateCollection', record.id, payload)
          log '.'
        end
      end
      log "\nAll done with collections!"
    end

    task composers: :environment do
      desc 'Create synthetic "create" events for all composers'

      records = Composer.all
      log "\nCreating event logs for #{records.count} composers"
      ActiveRecord::Base.transaction do
        records.each do |record|
          payload = {
            name: record.name,
            imdb_link: record.imdb_link,
          }
          create_event(record.created_by_id, 'CreateComposer', record.id, payload)
          log '.'
        end
      end
      log "\nAll done with composers!"
    end

    task countries: :environment do
      desc 'Create synthetic "create" events for all countries'

      records = Country.all
      log "\nCreating event logs for #{records.count} countries"
      ActiveRecord::Base.transaction do
        records.each do |record|
          payload = {
            name: record.name,
            description: record.description,
          }
          create_event(record.created_by_id, 'CreateCountry', record.id, payload)
          log '.'
        end
      end
      log "\nAll done with countries!"
    end

    task directors: :environment do
      desc 'Create synthetic "create" events for all directors'

      records = Director.all
      log "\nCreating event logs for #{records.count} directors"
      ActiveRecord::Base.transaction do
        records.each do |record|
          payload = {
            name: record.name,
            imdb_link: record.imdb_link,
          }
          create_event(record.created_by_id, 'CreateDirector', record.id, payload)
          log '.'
        end
      end
      log "\nAll done with directors!"
    end

    task material_formats: :environment do
      desc 'Create synthetic "create" events for all material formats'

      records = MaterialFormat.all
      log "\nCreating event logs for #{records.count} material formats"
      ActiveRecord::Base.transaction do
        records.each do |record|
          payload = {
            name: record.name,
            description: record.description,
          }
          create_event(record.created_by_id, 'CreateMaterialFormat', record.id, payload)
          log '.'
        end
      end
      log "\nAll done with material formats!"
    end

    task media_types: :environment do
      desc 'Create synthetic "create" events for all media types'

      records = MediaType.all
      log "\nCreating event logs for #{records.count} media types"
      ActiveRecord::Base.transaction do
        records.each do |record|
          payload = {
            name: record.name,
            description: record.description,
          }
          create_event(record.created_by_id, 'CreateMediaType', record.id, payload)
          log '.'
        end
      end
      log "\nAll done with media types!"
    end

    task production_companies: :environment do
      desc 'Create synthetic "create" events for all production companies'

      records = ProductionCompany.all
      log "\nCreating event logs for #{records.count} production companies"
      ActiveRecord::Base.transaction do
        records.each do |record|
          payload = {
            name: record.name,
            contact_info: record.contact_info,
          }
          create_event(record.created_by_id, 'CreateProductionCompany', record.id, payload)
          log '.'
        end
      end
      log "\nAll done with production companies!"
    end

    task repositories: :environment do
      desc 'Create synthetic "create" events for all repositories'

      # must run before collections
      records = Repository.all
      log "\nCreating event logs for #{records.count} repositories"
      ActiveRecord::Base.transaction do
        records.each do |record|
          payload = {
            name: record.name,
            location: record.location,
            website: record.website,
          }
          create_event(record.created_by_id, 'CreateRepository', record.id, payload)
          log '.'
        end
      end
      log "\nAll done with repositories!"
    end

    task resources: :environment do
      desc 'Create synthetic "create" events for all resources'

      records = Resource.all
      log "\nCreating event logs for #{records.count} resources"
      ActiveRecord::Base.transaction do
        records.each do |record|
          payload = {
            digital_copy_link: record.digital_copy_link,
            citation_source: record.citation_source,
            cataloging_notes: record.cataloging_notes,
            publication_status: record.publication_status,
            work_id: record.work_id,
            material_format_id: record.material_format_id,
            collection_ids: record.collections.map(&:id),
          }
          create_event(record.created_by_id, 'CreateResource', record.id, payload)
          log '.'
        end
      end
      log "\nAll done with resources!"
    end

    task works: :environment do
      desc 'Create synthetic "create" events for all works'

      records = Work.all
      log "\nCreating event logs for #{records.count} works"
      ActiveRecord::Base.transaction do
        records.each do |record|
          payload = {
            title: record.title,
            secondary_title: record.secondary_title,
            alias_alternates: record.alias_alternates,
            imdb_link: record.imdb_link,
            year: record.year,
            country_id: record.country_id,
            media_type_id: record.media_type_id,
            composer_ids: record.composers.map(&:id),
            director_ids: record.directors.map(&:id),
            orchestrator_ids: record.orchestrators.map(&:id),
            production_company_ids: record.production_companies.map(&:id),
          }
          create_event(record.created_by_id, 'CreateWork', record.id, payload)
          log '.'
        end
      end
      log "\nAll done with works!"
    end
  end

  # TODO: tasks to replay events
  # namespace :replay do
  #   desc 'Tasks related to replaying events from the event log'
  #
  #   task all: :environment do
  #   end
  # end
end

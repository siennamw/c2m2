# Preview all emails at http://localhost:3000/rails/mailers/contact_mailer
class ContactMailerPreview < ActionMailer::Preview
  def contact_email
    # http://localhost:3000/rails/mailers/contact_mailer/contact_email.html
    ContactMailer.contact_email('Jane Doe', 'jane.doe@example.com', 'An important message.')
  end

  def suggestion_email
    # http://localhost:3000/rails/mailers/contact_mailer/suggestion_email.html
    fields = {
      composers: 'one or more composers',
      works: 'works or films concerned',
      link: 'link to a resource',
      location: 'name of library, repository, database...',
      comments: 'additional comments here'
    }
    ContactMailer.suggestion_email('Jane Doe', 'jane.doe@example.com', fields)
  end
end

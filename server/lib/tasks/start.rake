namespace :start do
  task :build do
    exec 'foreman start -f ../Procfile'
  end
end

desc 'Start build server'
task :start => 'start:build'

require 'rubygems'
require 'sinatra'
Dir[File.dirname(__FILE__)+'/models/*.rb'].each { |f| require f }


get '/' do
  @title = 'eyez.at: Geocoordinate link shortener'
  @init_func = 'initMain'
  erb :main
end


get '/about/?' do
  @title = 'eyez.at: About the geocoordinate link shortener'
  erb :about
end


get '/search/?' do
  @title = 'eyez.at: Search different location'
  @init_func = 'initSearch'
  erb :search
end


get '/:link' do
  @link = params[ :link ]
  geojam = Geojam.new()
  geojam.base62_jam = @link
  raise Sinatra::NotFound unless geojam.base62_jam
  @coordinates = geojam.coordinates

  @title = 'eyez.at this geocoordinate location'
  @init_func = 'initLink'
  erb :link
end


not_found do
  'eyezat 404'
end


error do
  'eyezat 500'
end
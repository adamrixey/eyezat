# http://www.colourlovers.com/palette/1/metro
# https://developer.mozilla.org/en-US/docs/Using_geolocation
# http://dev.w3.org/geo/api/spec-source.html
# https://developers.google.com/maps/documentation/javascript/geocoding#Geocoding

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

get '/alt/?' do
  @title = 'eyez.at: Non-current location geocoordinate link shortener'
  @init_func = 'initAlt'
  erb :alt
end

get '/:link' do
  @title = 'eyez.at this geocoordinate location'
  @init_func = 'initLink'
  @link = params[ :link ]
  @coordinates = Geojam.new( @link ).coordinates
  raise Sinatra::NotFound unless @coordinates
  erb :link
end

not_found do
  'eyezat 404'
end


error do
  'eyezat 500'
end
# http://www.colourlovers.com/palette/1/metro
# https://developer.mozilla.org/en-US/docs/Using_geolocation
# http://dev.w3.org/geo/api/spec-source.html

require 'rubygems'
require 'sinatra'
Dir[File.dirname(__FILE__)+'/models/*.rb'].each { |f| require f }

get '/' do
  @link = ''
  @coordinates = { :latitude => '', :longitude => '' }
  @map_zoom = 16
  erb :eyezat
end

get '/:link' do
  @link = params[ :link ]
  @coordinates = Geojam.new( @link ).coordinates
  @map_zoom = 13
  raise Sinatra::NotFound unless @coordinates
  erb :eyezat
end

not_found do
  'eyezat 404'
end


error do
  'eyezat 500'
end
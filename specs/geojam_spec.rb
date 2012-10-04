require File.dirname(__FILE__)+'/spec_helper.rb'

class GeojamTest < Test::Unit::TestCase
  describe 'Geojam' do
    setup do
      @g = Geojam.new()
    end

    should 'have a base62_jam attribute' do
      assert @g.respond_to?( :base62_jam )
    end

    should 'have a valid 10 character base62 jam value' do
      @g.base62_jam = '2GU471BHby'
      assert @g.base62_jam
    end

    should 'fail with invalid 10 character base62 jam value' do
      @g.base62_jam = '2GU471BHb'
      assert_nil @g.base62_jam
    end

    should 'have a coordinates attribute' do
      assert @g.respond_to?( :coordinates )
    end

    should 'have expected base10 coordinates' do
      @g.base62_jam = '2GU471BHby'
      coords = {
        :latitude => 37.77967,
        :longitude => -122.39520
      }
      assert ( ( @g.coordinates[ :latitude ] - 37.77967 ).abs < 0.000001 )
      assert ( ( @g.coordinates[ :longitude ] + 122.39520 ).abs < 0.000001 )
    end
  end
end
class Geojam

  attr_reader :base62_jam

  def initialize()
    @base62_set =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  end


  def base62_jam=( _base62_jam )
    # validate 10 base62 characters
    return nil if ( _base62_jam =~ /^[0-9A-Z]{10}$/i ).nil?

    @latitude = expand( _base62_jam[ 0..4 ] )
    @longitude = expand( _base62_jam[ 5..9 ] )
    @base62_jam = _base62_jam
  end


  def coordinates
    {
      :latitude => @latitude,
      :longitude => @longitude
    }
  end


  def expand( compressed )
    # build base10 int by multipling the power of each column by its value and
    #  sum each column's results
    cord = 0
    compressed.split('').reverse.each_with_index do | value, index |
      cord += ( @base62_set.index( value ) * ( 62 ** index ) )
    end

    # return to standard decimals
    cord = cord / 100000.0

    # remove add shift for 5 base62 characters
    cord = cord - 360.0

    return cord
  end

end
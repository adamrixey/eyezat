class Geojam

  attr_reader :shortener

  def initialize( shortener )
    @shortener = shortener
    @short_lat = shortener[ 0..4 ]
    @short_long = shortener[ 5..9 ]
    @base62set =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  end

  def coordinates
    # validate shortener
    return nil if ( @shortener =~ /^[0-9A-Z]{10}$/i ).nil?

    {
      :latitude => expand( @short_lat ),
      :longitude => expand( @short_long )
    }
  end

  def expand( compressed )
    # build base10 int by multipling the power of each column by its value and
    #  sum each column's results
    cord = 0
    compressed.split('').reverse.each_with_index do | value, index |
      cord += ( @base62set.index( value ) * ( 62 ** index ) )
    end

    # return to standard decimals
    cord = cord / 100000.0

    # remove add shift for 5 base62 characters
    cord = cord - 360.0

    return cord
  end

end
require 'minitest/autorun'
require 'rack/test'
require 'json'
require 'mocha/minitest'
require_relative '../app'

ENV['RACK_ENV'] = 'test'

class PrinterManagementTest < Minitest::Test
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  def setup
    # Setup initial state
    @initial_printers = [
      { 'alias' => 'Office Printer', 'printer_ip' => '192.168.1.100' }
    ]
    @mock_printers = @initial_printers.dup

    # Stub the PRINTERS constant to use the mock printers array
    Object.send(:remove_const, :PRINTERS) if Object.const_defined?(:PRINTERS)
    Object.const_set(:PRINTERS, @mock_printers)

    # Stub the File.open method to prevent actual file operations
    File.stubs(:open).yields(StringIO.new)
  end

  def teardown
    # Restore the original PRINTERS constant
    Object.send(:remove_const, :PRINTERS)
  end

  def test_add_new_printer
    post '/printers', alias: 'New Printer', printer_ip: '192.168.1.101'

    assert last_response.redirect?
    follow_redirect!

    assert_equal '/printers', last_request.path

    # Verify that the new printer was added to the mock PRINTERS array
    expected_printers = @initial_printers + [{ 'alias' => 'New Printer', 'printer_ip' => '192.168.1.101' }]
    puts "Expected printers: #{expected_printers.inspect}"
    puts "Mock printers: #{@mock_printers.inspect}"
    assert_equal expected_printers, @mock_printers
  end
end

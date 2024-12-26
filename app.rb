require 'sinatra'
require 'snmp'
require 'json'

# Load printer configuration from JSON file
printer_config = JSON.parse(File.read('printers.json'))
COMMON_OIDS = printer_config['common_oids']
PRINTERS = printer_config['printers']

def fetch_printer_data(printer_ip, oids)
  data = {}
  SNMP::Manager.open(host: printer_ip) do |manager|
    oids.each do |key, oid|
      response = manager.get(oid)
      data[key] = response.varbind_list.first.value.to_s
    end
  end
  data
end

get '/' do
  @fetch_printers_data = PRINTERS.map do |printer|
    specific_oids = printer['specific_oids'] || {}
    oids = COMMON_OIDS.merge(specific_oids)
    data = fetch_printer_data(printer['printer_ip'], oids)
    {
      alias: printer['alias'],
      model: data['model'],
      ip: printer['printer_ip'],
      data: data
    }
  end
  erb :index
end

get '/new' do
  erb :new_printer
end

post '/printers' do
  printer = {
    'alias' => params[:alias],
    'printer_ip' => params[:printer_ip],
    'specific_oids' => params[:specific_oids] || {}
  }
  PRINTERS << printer
  puts "PRINTERS array after addition: #{PRINTERS.inspect}"
  File.open('printers.json', 'w') do |f|
    f.write(JSON.pretty_generate({ 'common_oids' => COMMON_OIDS, 'printers' => PRINTERS }))
  end
  redirect '/'
end

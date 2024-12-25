require 'sinatra'
require 'snmp'
require 'json'

printer_config = JSON.parse(File.read('printers.json'))
COMMON_OIDS = printer_config['common_oids']
PRINTERS = printer_config['printers']

def fetch_printer_data(printer_ip, common_oids, specific_oids)
  data = {}
  SNMP::Manager.open(host: printer_ip) do |manager|
    common_oids.merge(specific_oids).each do |key, oid|
      response = manager.get(oid)
      data[key] = response.varbind_list.first.value.to_s
    rescue StandardError => e
      puts "Error fetching OID #{oid} for printer #{printer_ip}: #{e.message}"
      data[key] = 'Error'
    end
  end
  data
end

get '/' do
  @fetch_printers_data = PRINTERS.map do |printer|
    data = fetch_printer_data(printer['printer_ip'], COMMON_OIDS, printer['specific_oids'])
    {
      alias: printer['alias'],
      ip: printer['printer_ip'],
      model: data['model'],
      data: data
    }
  end
  puts "Fetched printer data: #{@fetch_printer_data.inspect}"
  erb :index
end

get '/new' do
  erb :new_printer
end

post '/' do
  printer = {
    'alias' => params[:alias],
    'printer_ip' => params[:printer_ip]
  }
  PRINTERS << printer
  File.open('printers.json', 'w') do |f|
    f.write(JSON.pretty_generate(PRINTERS))
  end
  redirect '/'
end

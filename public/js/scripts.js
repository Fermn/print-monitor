document.addEventListener('DOMContentLoaded', function() {
  const printerLinks = document.querySelectorAll('[data-printer-ip]');
  printerLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const printerIp = this.getAttribute('data-printer-ip');
      fetch(`/fetch_printer_data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ printer_ip: printerIp })
      })
        .then(response => response.json())
        .then(data => {
          // Debugging: Log the data object
          console.log('Fetched data:', data);
          if (data) {
            document.getElementById('printer-status').textContent = data.status || 'Status not found';
            document.getElementById('printer-model').textContent = data.model || 'Model not found';
            document.getElementById('printer-alias').textContent = data.alias || 'alias not found';
            document.getElementById('printer-ip').textContent = data.printer_ip || 'IP address not found';
            document.getElementById('black-toner').textContent = data.toner.black_level || 'Cartridge levels not found';
            document.getElementById('yellow-toner').textContent = data.toner.yellow_level || 'Cartridge levels not found';
            document.getElementById('cyan-toner').textContent = data.toner.cyan_level || 'Cartridge levels not found';
            document.getElementById('magenta-toner').textContent = data.toner.magenta_level || 'Cartridge levels not found';
          } else {
            console.error('No data found for the printer.');
          }
        })  
        .catch(error => {
          console.error('Error fetching printer data:', error);
        });
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const printerLinks = document.querySelectorAll('[data-printer-ip]');
  printerLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const printerIp = this.getAttribute('data-printer-ip');
      fetch(`/printers/${printerIp}`)
        .then(response => response.json())
        .then(data => {
          // Debugging: Log the data object
          console.log('Fetched data:', data);

          // Check if the data object contains the model property
          if (data && data.model) {
            // Debugging: Log the model value
            console.log('Model:', data.model);

            // Update the bento grid with the printer data
            const printerModelElement = document.getElementById('printer-model');

            // Debugging: Log the element to ensure it is selected correctly
            console.log('Printer model element:', printerModelElement);

            if (printerModelElement) {
              printerModelElement.innerHTML = data.model;
            } else {
              console.error('Element with id "printer-model" not found.');
            }
          } else {
            console.error('Model property not found in data.');
          }
        })
        .catch(error => {
          console.error('Error fetching printer data:', error);
          // Update the bento grid with the printer data
          // document.getElementById('printer-model').innerHTML = data.model;
          // document.getElementById('printer-ip').textContent = data.printer_ip;
          // document.getElementById('printer-toner').textContent = data.data.toner_level;
        });
    });
  });
});
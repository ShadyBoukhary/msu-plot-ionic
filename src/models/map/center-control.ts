export class CenterControl {
    constructor(controlDiv: HTMLDivElement, map) {
        // Set CSS for the control border.
      let controlUI = document.createElement('div');
      controlUI.style.backgroundColor = '#fff';
      controlUI.style.border = '2px solid #fff';
      controlUI.style.borderRadius = '3px';
      controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
      controlUI.style.cursor = 'pointer';
      controlUI.style.marginBottom = '22px';
      controlUI.style.textAlign = 'center';
      controlUI.title = 'Click to recenter the map';
      controlDiv.appendChild(controlUI);
 
      // Set CSS for the control interior.
      let controlText = document.createElement('div');
      controlText.style.color = 'rgb(25,25,25)';
      controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
      controlText.style.fontSize = '16px';
      controlText.style.lineHeight = '38px';
      controlText.style.paddingLeft = '5px';
      controlText.style.paddingRight = '5px';
      controlText.innerHTML = 'Campus Top View';
      controlUI.appendChild(controlText);
 
      // Setup the click event listeners: simply set the map to MSU Campus Top View.
      let center: {} = {
       lat: 33.872861,
       lng: -98.521279
     };
      controlUI.addEventListener('click', function() {
        map.setCenter(center);
        map.setZoom(16);
      });
    }
}
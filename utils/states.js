module.exports = {
  uvi: function(state) {
    switch (state) {
      case 0:
        return 'Bajo';
      case 1:
        return 'Bueno';
      case 2:
        return 'Regular';
      case 3:
        return 'Alto ❗️';
      case 4:
        return 'Muy alto 👹';
      default:
        return 'Sin información';
    }
  },

  seaQuality: function(state) {
    switch (state) {
      case 1:
        return 'Bueno';
      case 2:
        return 'Regular';
      case 3:
        return 'Malo';
      default:
        return 'Sin información';
    }
  },

  hasJeallyfish: function(state) {
    switch (state) {
      case 1:
        return 'No';
      case 2:
        return 'Sí';
      default:
        return 'Sin información';
    }
  },

  flagState: function(state) {
    switch (state) {
      case 1:
        return 'Bandera verde: Permitido bañarse';
      case 2:
        return 'Bandera amarilla: Bañarse con precaución';
      case 3:
        return 'Bandera roja: Prohibido bañarse';
      default:
        return 'Sin información';
    }
  },

  moreInfo: function(state) {
    switch (state) {
      case 5:
        return 'Residuos flotantes 💩\n';
      default:
        return '';
    }
  },

  flag: function(state) {
    switch (state) {
      case 1:
        return '✅';
      case 2:
        return '⚠️';
      case 3:
        return '🛑';
      default:
        return '';
    }
  },

  formatString: function(text) {
    const newText = text
      .toLowerCase()
      .replace(new RegExp("[àáâãäå]", 'g'),"a")
      .replace(/[^a-zA-Z]/g, '');
    return newText;
  },
};

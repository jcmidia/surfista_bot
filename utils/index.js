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
        return 'Permitido bañarse ✅\n';
      case 2:
        return 'Bañarse con precaución ⚠️\n';
      case 3:
        return 'Prohibido bañarse 🛑\n';
      default:
        return '';
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

  cleanString: function(text) {
    return text
      ? text
          .toLowerCase()
          .replace(/[àáâãäå]/g, 'a')
          .replace(/[óòõôø]/g, 'o')
          .replace(/[íìïî]/g, 'i')
          .replace(/[èéêë]/g, 'e')
          .replace(/[úûù]/g, 'u')
          .replace(/[^a-zA-Z]/g, '')
      : '';
  },

  removeBreakLine(text) {
    return text
      ? text
          .replace(/(\r\n|\n|\r)/gm, '')
          .replace(/\s+/g, ' ')
          .trim()
      : '';
  },
};

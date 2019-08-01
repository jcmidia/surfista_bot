module.exports = {
  uvi: function (state) {
    switch (state) {
      case 0:
        return 'Bajo'
      break;
      case 1:
        return 'Bueno'
      break;
      case 2:
        return 'Regular'
      break;
      case 3:
        return 'Alto ❗️'
      break;
      case 4:
        return 'Muy alto 👹'
      break;
      default:
        return 'Sin información'
      break;
    }
  },

  seaQuality: function (state) {
    switch (state) {
      case 1:
        return 'Bueno'
      break;
      case 2:
        return 'Regular'
      break;
      case 3:
        return 'Malo'
      break;
      default:
        return 'Sin información'
      break;
    }
  },

  hasJeallyfish: function (state) {
    switch (state) {
      case 1:
        return 'No'
      break;
      case 2:
        return 'Sí'
      break;
      default:
        return 'Sin información'
      break;
    }
  },

  flagState: function (state) {
    switch (state) {
      case 1:
        return 'Bandera verde: Permitido bañarse'
      break;
      case 2:
        return 'Bandera amarilla: Bañarse con precaución'
      break;
      case 3:
        return 'Bandera roja: Prohibido bañarse'
      break;
      default:
          return 'Sin información'
      break;
    }
  },

  moreInfo: function (state) {
    switch (state) {
      case 5:
        return 'Residuos flotantes 💩\n'
      break;
      default:
          return ''
      break;
    }
  },

  flag: function (state) {
    switch (state) {
      case 1:
        return '✅'
      break;
      case 2:
        return '⚠️'
      break;
      case 3:
        return '🛑'
      break;
      default:
        return ''
      break;
    }
  },

  formatString: function (text) {
    return text.toLowerCase().replace(/[^a-zA-Z]/g, "");
  }
}

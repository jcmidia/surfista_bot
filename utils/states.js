module.exports = {
  uvi: function (state) {
    switch (state) {
      case 0:
        return 'Bajo'
      break;
      case 1:
        return 'Regular'
      break;
      case 2:
        return 'Alto'
      break;
      default:
        return 'Regular'
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
        return 'Regular'
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
        return 'No'
      break;
    }
  },

  flagState: function (state) {
    console.log(state);
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
          return 'Bandera amarilla: Bañarse con precaución'
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
        return '⚠️'
      break;
    }
  }
}

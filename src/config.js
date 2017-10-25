const colors = ['#9c27b0', '#3f51b5', '#2196f3', '#03a9f4', '#f44336', '#e91e63',
  '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107',
  '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b']

module.exports = {
  _color: {
    get: (index) => {
      if (index > colors.length) {
        return colors[0]
      } else return colors[index]
    }
  },
  _space: {
    left: 80,
    bottom: 80,
    top: 60,
    right: 40
  }
}

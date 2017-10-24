module.exports = {
  generateAxisScales (min, max, num) {
    let delta = max - min
    if (delta < 1.0) {
      max += (1.0 - delta) / 2.0
      min -= (1.0 - delta) / 2.0
    }

    delta = max - min
    let exp = parseInt(Math.log(delta) / Math.log(10.0)) - 2
    let multiplier = Math.pow(10, exp)
    const solutions = [1, 2, 2.5, 5, 10, 20, 25, 50, 100, 200, 250, 500]
    let i = 0
    for (i = 0; i < solutions.length; i++) {
      let multiCal = multiplier * solutions[i]
      if (parseInt(delta / multiCal) + 1 <= num) break
    }
    let interval = multiplier * solutions[i]
    let start = (parseInt(Math.ceil(min / interval)) - 1) * interval
    let ret = []
    for (let j = 0; 1; j++) {
      let v = start + interval * j
      ret.push(v)
      if (v > max) break
    }
    return ret
  }
}

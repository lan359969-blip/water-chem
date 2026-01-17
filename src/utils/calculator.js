export const Calculator = {
  parseWechat(text) {
    // 占位解析（保证不报错）
    return null
  },

  calculateDosing(diff, conc, waters) {
    return {
      p1: {
        coagAB: 0,
        coagCD: 0
      },
      p2: {}
    }
  },

  calculateChlorine(diff, conc, waters, includeSupp) {
    return {
      pre: { ab: 0 },
      main: {},
      supp: {}
    }
  }
}
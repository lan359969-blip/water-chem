// calc-core.js
// 第一版：100% 来自现有系统计算逻辑（未优化、未合并、未抽象）
// ⚠️ 本文件只包含计算，不依赖 DOM，不读写页面

/* ========== 56 系水量分配 ========== */
// total56：56 系总水量
// ratio：{ r51, r52, r61, r62 }
export function allocate56Water(total56, ratio) {
  const t = Number(total56);
  const r51 = Number(ratio.r51) || 0;
  const r52 = Number(ratio.r52) || 0;
  const r61 = Number(ratio.r61) || 0;
  const r62 = Number(ratio.r62) || 0;

  const sum = r51 + r52 + r61 + r62;
  if (!t || !sum) {
    return { w51: 0, w52: 0, w61: 0, w62: 0 };
  }

  return {
    w51: t * r51 / sum,
    w52: t * r52 / sum,
    w61: t * r61 / sum,
    w62: t * r62 / sum
  };
}

/* ========== 差值计算 ========== */
// curr：本时段
// prev：上时段
export function calcDiff(curr, prev) {
  const c = Number(curr);
  const p = Number(prev);
  if (isNaN(c) || isNaN(p)) return 0;
  const d = c - p;
  return d > 0 ? Math.floor(d) : 0;
}

/* ========== 单耗计算（混凝 / 助凝共用） ========== */
// diff：刻度差（整数）
// water：对应水量
// concentration：药剂浓度
// factor：单位换算（默认 10000）
export function calcSingleCost(diff, water, concentration, factor = 10000) {
  const d = Number(diff);
  const w = Number(water);
  const c = Number(concentration);

  if (!d || !w || !c) return null;
  return d / w * c * factor;
}

/* ========== 加氯计算（一期 / 二期） ========== */
// water：水量
// effCl：有效氯浓度
export function calcChlorine(water, effCl) {
  const w = Number(water);
  const c = Number(effCl);
  if (!w || !c) return null;
  // 公式保持与现有系统一致（单位换算不在此优化）
  return w * c;
}

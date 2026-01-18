// src/modules/dosing/shared/unit.js

export const PI = Math.PI

// 水 / 溶液默认密度（kg/m³）
export const DENSITY = {
  WATER: 1000,
  COAG: 1200, // 混凝剂（按你原系统常用值，可改）
  AID: 1100   // 助凝剂
}

// 单位换算
export const UNIT = {
  MM_TO_M: 0.001,
  CM_TO_M: 0.01,
  L_TO_M3: 0.001,
  KG_TO_T: 0.001
}
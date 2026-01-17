// src/utils/dosing/constants.js

export const P1 = {
  COAG: {
    DISS_MAX_VOL: 20,        // m³
    DISS_AREA: 8,            // m²
    SOL_AREA: 37.21,         // m²
    SOL_MAX_H: 3.2           // m
  },
  AID: {
    RADIUS: 0.66,            // m
    DENSITY: 1380,           // kg/m³
    POOL_AREA: 6.8 * 4,      // m²
    POOL_MAX_H: 3.0          // m
  }
}

export const P2 = {
  COAG: {
    DISS_AREA_SINGLE: 3.6 * 2.4, // m²
    DISS_MAX_H: 2.6,             // m
    SOL_AREA: 5.4 * 4.6,         // m²
    SOL_MAX_H: 2.7               // m
  },
  AID: {
    TANK_L: 1.26,                // m
    TANK_W: 1.26,                // m
    DENSITY: 1380,               // kg/m³
    POOL_AREA: 5.4 * 4.5,        // m²
    POOL_MAX_H: 2.9              // m
  }
}
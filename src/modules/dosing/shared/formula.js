import { PI } from './unit'

export function cylinderVolume(radius, height) {
  return PI * radius ** 2 * height
}

export function mass(volume, density) {
  return volume * density
}

export function addWaterHeight(deltaVolume, poolArea) {
  return deltaVolume / poolArea
}
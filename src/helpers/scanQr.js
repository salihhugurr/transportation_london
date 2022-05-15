import type { Frame } from 'react-native-vision-camera'


export function scanQr(frame: Frame) {
  'worklet'
  return __scanQrCodes(frame)
}

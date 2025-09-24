import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone 11 / standard reference)
const BASE_WIDTH = 414;
const BASE_HEIGHT = 896;

/**
 * Scale size based on device width
 */
export const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;

/**
 * Vertical scale based on device height
 */
export const verticalScale = (size: number) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

/**
 * Moderate scale with factor (0.5 = half of the difference)
 * Helps prevent fonts from becoming too large on big devices
 */
export const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

/**
 * Scale font size with accessibility settings taken into account
 */
export const scaleFont = (size: number, factor = 0.5): number =>
    Math.round(PixelRatio.roundToNearestPixel(moderateScale(size, factor) * PixelRatio.getFontScale()));

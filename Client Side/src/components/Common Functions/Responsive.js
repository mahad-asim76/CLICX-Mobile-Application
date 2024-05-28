import { Dimensions, PixelRatio, Platform } from 'react-native';
import * as Constants from '../../Common/Constants';


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const isSmallScreen = SCREEN_WIDTH < 400;
const isMediumScreen = SCREEN_WIDTH >= 400 && SCREEN_WIDTH < 500;
const isMediumLargeScreen = SCREEN_WIDTH >= 500 && SCREEN_WIDTH < 600;
const isLargeScreen = SCREEN_WIDTH >= 600 && SCREEN_WIDTH < 800;
const isTablet = SCREEN_WIDTH >= 800;

function getHeightBaseScale(height) {
  if (height < 600) {
    return height / 800;
  } else if (height < 700 && height >= 600) {
    return height / 760;
  } else if (height < 730 && height >= 700) {
    return height / 735;
  } else if (height < 760 && height >= 730) {
    return height / 730;
  } else if (height < 800 && height >= 760) {
    return height / 740;
  } else if (height < 850 && height >= 800) {
    return height / 780;
  }else if (height < 900 && height >= 850) {
    return height / 785;
  } else if (height < 950 && height >= 900) {
    return height / 800;
  } else if (height < 1000 && height >= 950) {
    return height / 700;
  } else if (height < 1100 && height >= 1000) {
    return height / 750;
  } else if (height < 1200 && height >= 1100) {
    return height / 850;
  } else if (height < 1300 && height >= 1200) {
    return height / 800;
  } else if (height < 1400 && height >= 1300) {
    return height / 780;
  } else {
    return height / 500; 
  }
}

let widthBaseScale, heightBaseScale;

if (isSmallScreen) {
  widthBaseScale = SCREEN_WIDTH / 400;
  heightBaseScale = getHeightBaseScale(SCREEN_HEIGHT);
} else if (isMediumScreen) {
  widthBaseScale = SCREEN_WIDTH / 500;
  heightBaseScale = getHeightBaseScale(SCREEN_HEIGHT);
} else if (isMediumLargeScreen) {
  widthBaseScale = SCREEN_WIDTH / 600;
  heightBaseScale = getHeightBaseScale(SCREEN_HEIGHT);
} else if (isLargeScreen) {
  widthBaseScale = SCREEN_WIDTH / 700;
  heightBaseScale = getHeightBaseScale(SCREEN_HEIGHT);
} else if (isTablet) {
  widthBaseScale = SCREEN_WIDTH / 900;
  heightBaseScale = getHeightBaseScale(SCREEN_HEIGHT);
}


function normalize(size, based = 'width') {
  const newSize = based === 'height' ? size * heightBaseScale : size * widthBaseScale;

  if (Platform.OS === Constants.Devices.IOS) {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
}

const widthPixel = (size) => normalize(size, 'width');
const heightPixel = (size) => normalize(size, 'height');
const fontPixel = (size) => heightPixel(size);
const pixelSizeVertical = (size) => heightPixel(size);
const pixelSizeHorizontal = (size) => widthPixel(size);

export default {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
};

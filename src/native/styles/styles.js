import { 
  Platform
} from 'react-native';
import { createStyles, maxHeight } from 'react-native-media-queries';

const baseStyle = {
  podorozhnikAppView: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
    // backgroundColor: 'red'
    // padding: 16
  },
  appNavigator: {
    // backgroundColor: 'green'
  },
  homeView: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
    // backgroundColor: 'red'
  },
  statusBar: {
    hidden: false
  },
  navBar: {
    // backgroundColor: 'transparent'
    // backgroundColor: 'lightyellow'
  },
  homeScrollView: {
    // flex: 1
    // marginTop: -20
  },
  mainContent: {
    // backgroundColor: 'lightblue',
    flex: 1,
    flexDirection: 'column',
    // alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    margin: 16,
    marginTop: 0,
    marginBottom: 90  // max banner height (rea banner height will probably be less)
    // backgroundColor: 'red'
  },
  optionsBlock: {
    // marginTop: 20,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ddd',
    // backgroundColor: "lightblue"
  },
  totalBlockWrapper: {
    marginTop: 20,
  },
  averageBlockWrapper: {

  },
  totalBlock:{
    flexDirection: 'row',
    alignItems: 'center',
    // height: 92,
    // backgroundColor: '#dff0d8',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 12
  },
  totalBlockText: {
    flex: 1,
    // color: '#3c763d',
    fontSize: 20
  },
  totalValueWrapper: {
    // alignSelf: 'center',
    borderWidth: 1,
    padding: 4,
    marginLeft: 16,
    backgroundColor: '#dff0d8',
    borderColor: '#ddd',
  },
  totalBlockValue: {
    // backgroundColor: 'red',
    color: '#3c763d',
    fontSize: 28
  },
  averageBlock: {
    flex: 3,
    padding: 12,
    // paddingBottom: 0,
    // borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    // backgroundColor: 'blue'

    borderColor: '#ddd',
  },
  averageBlockText: {
    fontSize: 20,
  },
  detailedList: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',    
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    // height: 112,
    // faking border on the top of the list only. borderTopWidth didn't work
    margin: -1  
  },
  explanationLine: {
    // backgroundColor: 'lightblue'
  },
  inputBlockWrapper: {
    marginTop: 16,
    // backgroundColor: 'blue'
  },
  inputBlock: {
   // marginTop: 88
    // alignSelf: 'flex-end'
  },
  topUpRow: {
    marginTop: 12,
    marginBottom: 12,
    alignItems: 'center',
    // backgroundColor: 'lightyellow',
    margin: 0,
    // height: 0,
    // opacity: 0
  },
  topUpButton: {
    color: '#007AFF',
    fontSize: 20
  },
  bottomBannerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bottomBanner: {
    alignSelf: 'stretch'
  },
  inputsBlock: {
    flexDirection: 'column',
    alignItems: 'stretch',
    marginTop: 12
  },
  inputsBlockTitle: {
    alignSelf: 'center',
    marginBottom: 12
  },  
};

export const appStyle = createStyles(
  baseStyle,
  maxHeight(400, {
    optionsBlock: {
      marginTop: 0,
      // backgroundColor: 'yellow'
    },
    statusBar: {
      hidden: true
    },
    totalBlock: {
      height: 58
    }
  }
  )
);

export const inputBlockStyle = {
  wholeBlock: {
    flexDirection: 'column',
    alignItems: 'stretch',
    // backgroundColor: 'green',
  },
  sectionTitle: {
    alignSelf: 'center',
    fontSize: 26,
    marginTop: 4,
  },
  valuesRow: {
    flexDirection: 'row',
    marginTop: 4,
    // backgroundColor: 'lightyellow',
  },
  valueControl: {
    flex: 1,
    // width: 30
  }
};

export const labeledSliderStyle = {
  labeledSliderView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor: 'lightblue',
    // width: 200,
    marginLeft: 4,
    marginRight: 4,
  },
  labeledSliderSlider: {
    alignSelf: 'stretch',
    // backgroundColor: 'red'
  }
};

export const topUpViewStyle = {
  wholeView: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
  },
  statusBar: {
    hidden: false
  },
  mainContent: {
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: 'stretch',
  },
  bottomBannerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bottomBanner: {
    alignSelf: 'stretch'
  },
  mainText: {
    marginBottom: 12,
    fontSize: 18,
    textAlign: Platform.OS === 'ios' ? 'justify' : 'left'
  },
  preformattedText: {
    // backgroundColor: 'lightgrey'
    fontFamily: 'Cochin',
    fontSize: 18
  },
  link: {
     // backgroundColor: 'white',
     textDecorationLine: 'underline',
     color: 'blue'
  },
  sectionTitle: {
    alignSelf: 'center',
    fontSize: 26,
    marginTop: 4,
    marginBottom: 4,
  },
  cardNumberInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  topUpValueControl: {
    alignSelf: 'stretch'
  },
  sendSmsUpButton: {
    alignSelf: 'center',
    color: '#007AFF',
    fontSize: 20,
    marginBottom: 12,
  }
};

export const webPageViewStyle = {
  wholeView: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
  },
  statusBar: {
    hidden: false
  },
  bottomBannerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bottomBanner: {
    alignSelf: 'stretch'
  },
  mainText: {
    margin: 12
  },
  preformattedText: {
    // backgroundColor: 'lightgrey'
    fontFamily: 'Cochin',
    fontSize: 18
  },
  link: {
     backgroundColor: 'white',
     textDecorationLine: 'underline',
     color: 'blue'
  },
  innerWebView: {
    flex: 1,
    backgroundColor: 'lightyellow',
  },
};

# Podorozhnik - a simple calculator app to demonstrate how cross-platform ReactJS and ReactNative could be

This project is a demo project for showcasing how ReactJS and ReactNative can be used for building web, Android and iOS app from the same or similar source code while using a set of standard features you'd expect to "just work" from any half-hobby app that is:
- Actions tracking: Google Analytics is used in this project
- Ads: Google AdMob is used in this project on the app side and Google AdManager on the web side
- Layout for different devices, portrait-landscape relayouting on the fly: CSS-based layouting is used in this project
- Native-looking UI: Mostly real native controls are used here (well, as native as ReactNative provides them), but native-looking control is used for the title bar
- System interaction: SMS sending as for this particular project

And I also wanted to play with the Redux idea of single source of app state modifiable by commands only.

## Summary as of end of 2016

Using the same code between iOS and Android is quite possible yet difficult. Android is less supported more buggy and you are likely to have things behaving considerably more slow on the Android side. Yet if you feel yourself comfortable with ReactJS and are fine with skipping old/low-end Android devices, building simple ReactNavite apps might be easy enough not to try learning ObjectiveC, Swift or Android kind of Java.

Nowadays for many functionality areas you are able to find the modules that work the same way on both Android and iOS, yet you'll need search for them. Many module authors do not care much of crossplatformness.

Many (most in my experience) ReactNative modules you find on github are still in their infancy and may work only with the scenario the author needed for his particular use case, you are not very likely to find something standards-bases (e.g. I don't think there is a ReactNative CSS styling library that makes a difference between min-width and min-device-with).

Be ready to having to search for the solutions you'd expect to work out of the box in many mature frameworks (e.g. how to use routing AND )

Sharing code between iOS-Android and web.. on the other hand doesn't work very well. Most probably you'll need to rewrite whole UI layer (though you can keep same design ideas), you'll probably use different mechanism for backend-like things (e.g. for data storage between app starts) and what's left is "pure app logic". The more of this you have, the more likely you'll have benefits from sharing the code between mobile and app code. 

## What to use from this demo and what to ignore

This is a study and demo app, so there are areas where corners are somewhat cut or where I just didn't know how to use the feature properly and didn't care to rebuild. So here's a list of things that seem to be mostly okay and that you better ignore.

### What works mostly well and you may want to use similar ideas for your apps
- AdMob module for ReactNative side and it's counterparty on the web side
- Google Analytics module use

### What seems to be okayish though might be not the best practice
- Redux usage. Mostly is okay, but you may like structuring the action creators and reducers differently
- Routing a interacting between URL, routing and state (so that you could use GET params in the url to render app in the particular state and routed to the correct page)
- Lack of automated testing. I started structuring the app so that it could be easily testable automatically, but with so small and so UI-intensive project it happened to be much easier to use Redux tools to trace how events were modifying the model. In the end I disabled most of the tests and was doing most of debugging via Redux dev tools.
- Structuring controls so that there is always e.g. InputBlockContainer wrapping an InputBlock. The original decision to go this way was testing related (so that test harness could instantiate not-wired control easier) and since I dropped the automated UI tests completely this part of code is mostly useless.
- Using different Google Analytics IDs for web, iOS and Android versions. There are pros and cons of using same or different IDs for the different platforms of virtually the same app.

### What just works somehow and you may like to search for the alternative solutions
- Storing UI-specific data such as screen width or type of layout used in the model. Use react's selectors for this. Do not pollute model with the calculatable data.
- iPad layouts. That I just failed to make working. iPad runs the app in the iPhone mode.
- HTML template module on the web side and injecting certain scripts (E.g. disquss) via it. Not sure how good practice it is.
- Using disqus on the app side via web frame. It sounded like a good idea, but this way is buggy and doesn't really work.

## Building development version

*These instructions are not verified so most likely you'll need to solve a couple of hiccups on the way*

0. Install ReactJS and ReactNative so that you could run HelloWorlds

### For web
1. checkout the code
2. Install React Web Tools to Chrome
3. run webpack-dev-server in the `podorozhnik` subdirectory
4. Open the app in browser at http://localhost:8080

### For iOS
1. Open in XCode `podorozhnik/ios/podorozhnik.xcworkspace`
2. Make sure `AppDelegate.m` points to the local web server ( `jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];` )
3. Run in the XCode
4. Or use ReactNative's command line option: start `react-native run-ios` in the `podorozhnik` directory

### For Android
1. Start simulator
2. `react-natie run-android`

## Building release

### Modify code for your own IDs, etc

1. Replace Google Analytics IDs (separate for web, iOS and Android) with your own in `webpack.config.js` and `podorozhnik/src/native/components/App.js` Or you can skip this step, then I'll notice that somebody is running this demo code in my own Google Analytics set up just for it.

2. Change Android and iOS app IDs in `/podorozhnik/android/app/build.gradle` and... somewhere in iOS side. Most probably in the xcode project files.

3. Change the AdMob IDs in `WebPageView.js`, `TopUpView.js`, `Home.js` and GoogleTagManager values (originating from the Google AdManager) in `GoogleAdManagerTag.jsx` - otherwise any potentials earnings will be attributed to my account.

### Building web release
1. `npm run deploy` That will build everything optimized for production to the `dist` folder and will try to publish the results to the firebase service (front-end hosting lately purchasd by google). If you don't have firebase, that's okay, just grab the built app from the dist folder and put to some other web hosting

### Building iOS release

0. If that's not your first deployment you may need may need to update the version and build number in Target -> podorozhnik -> General -> Identity
1. Make sure `AppDelegate.m` points to the local web server ( `jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];` )
2. Open `podorozhnik.xcworkspace` in XCode
3. Product → Scheme → Edit Scheme... (or press ⌘ + <). Next, select Run from the menu on the left and change the Build Configuration to Release.
4. You can run app on the real iPhone connected via cable as usual
5. Build iOS app IPA file as you would do with any other iOS project (Product -> Archive).
6. Publish on iTunes connect. You can do it via XCode itself, but I'd recommend to use Apple's stand-alone Application Loader app. It can report on the possible errors muc better.
 
### Building Android release

0. If that's not your first deployment you may need to update the `versionCode` and `versionName` in `adroid/app/build/gradle`
1. `cd android && ./gradlew assembleRelease`
2. `builds to ./android/app/build/outputs/apk/app-release.apk`
3. And you can test it on a real Android phone connected via USB by `cd android && ./gradlew installRelease`
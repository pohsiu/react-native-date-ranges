
# react-native-date-ranges

## Getting started

`$ npm install react-native-date-ranges --save`

![alt text](https://github.com/pohsiu/react-native-date-ranges/blob/master/ezgif.com-video-to-gif.gif)

## Usage
```javascript
import DatePicker from 'react-native-date-ranges';

<DateRangePicker
	style={ { width: 350, height: 45 } }
	customStyles = { {
		placeholderText:{ fontSize:20 } // placeHolder style
		headerStyle : {  },			// title container style
		headerMarkTitle : { }, // title mark style 
		headerDateTitle: { }, // title Date style
		contentInput: {}, //content text container style
		contentText: {}, //after selected text Style
	} } // optional 
	centerAlign // optional text will align center or not
	allowFontScaling = {false} // optional
	placeholder={'Apr 27, 2018 → Jul 10, 2018'}
/>
```
  
## Props
| Prop | Type | Description |
:------------ |:---------------| :-----|
| **`placehoold`** | `string` | optional. |
| **`customStyles`** | `Object` | optional. customize style e.g.({ placeholderText:{}, headerStyle:{} ... }) |
| **`style`** | `object` | Optional. date picker's style |
....

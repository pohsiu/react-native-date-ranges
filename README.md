
# react-native-date-ranges
[![npm version](https://img.shields.io/npm/v/react-native-date-ranges.svg?style=flat-square)](https://www.npmjs.com/package/react-native-date-ranges)
[![npm downloads](https://img.shields.io/npm/dm/react-native-date-ranges.svg?style=flat-square)](https://www.npmjs.com/package/react-native-date-ranges)
## Getting started

`$ npm install react-native-date-ranges --save`

![alt text](https://raw.githubusercontent.com/pohsiu/react-native-date-ranges/master/ezgif.com-video-to-gif.gif)

## Usage
```javascript
import DatePicker from 'react-native-date-ranges';

//range picker
<DatePicker
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
	mode={'range'}
/>

//single picker
<DatePicker
	style={ { width: 350, height: 45 } }
	customStyles = { {
		placeholderText:{ fontSize:20 }, // placeHolder style
		headerStyle : {  },			// title container style
		headerMarkTitle : { }, // title mark style 
		headerDateTitle: { }, // title Date style
		contentInput: {}, //content text container style
		contentText: {}, //after selected text Style
	} } // optional 
	centerAlign // optional text will align center or not
	allowFontScaling = {false} // optional
	placeholder={'Apr 27, 2018'}
	selectedBgColor="black"
	selectedTextColor="blue"
/>


//customButton usage...
export default class NewPicker extends React.Component{
	
	customButton = (onConfirm) => (
		<Button
			onPress={onConfirm}
			style={{ container:{ width:'80%', marginHorizontal:'3%' }, text:{ fontSize: 20 } }}
			primary
			text={'送出'}
		/>
	)

  render(){
    const {
      ...rest
    } = this.props;
    return(
      <DatePicker
        ref = {(ref)=> this.picker = ref}
        {...rest}
        customButton = {this.customButton}
      />
    )
  }
} 

```
  
## Props
| Prop | Type | Description |
:------------ |:---------------| :-----|
| **`placeholder`** | `String` | optional. |
| **`customStyles`** | `Object` | optional. customize style e.g.({ placeholderText:{}, headerStyle:{} ... }) |
| **`style`** | `Object` | Optional. date picker's style |
| **`onConfirm`** | `Function` | Optional. call function after click button, that would return a date object {startDate:'', endDate:''} e.g( value=>console.log(value))|
| **`selectedBgColor`** | `String` | Optional. custom your selected date background color e.g {"black"} |
| **`selectedTextColor`** | `String` | Optional. custom your selected date text color e.g {"black"} |
| **`ButtonStyle`** | `Object` | Optional. custom your save button container style |
| **`ButtonTextStyle`** | `Object` | Optional. custom your save button Text style  |
| **`returnFormat`** | `String` | Optional. custom your datetime format e.g.('YYYY/MM/DD') at onConfirm |
| **`headFormat`** | `String` | Optional. custom your datetime format showing at headBlock e.g.('YYYY/MM/DD')|
| **`outFormat`** | `String` | Optional. custom your datetime format showing at outline touchable filed e.g.('YYYY/MM/DD')|
| **`mode`** | `String` | one of ['range', 'single'] , default as single|
| **`customButton`** | `component` | Optional (total custom your button component)e.g.(`<Button></Button>`) | 
| **`blockBefore`** | `Bool` | optional. default is false, decide blocke date before today or not | 
| **`markText`** | `String` | optional. default is "選擇日期", you can custom this prop to label text with ur own |
| **`buttonText`** | `String` | optional. you can modify default button't label with your own | 
| **`blockAfter`** | `Bool` | optional. default is false, decide blocke date after today or not |
| **`dateSplitter`** | `String` | optional. default is '->', decide custom dateSplitter with String  |
....

import React, { Component } from 'react';
import { View, TouchableHighlight, Modal, Text } from 'react-native';
import DateRange from './DateRange';
import moment from 'moment'; 
import normalize from './normalizeText';

const styles = {
  headCoverContainer: {
    paddingTop:10,
    height: normalize(120),
    width: '100%',
    justifyContent: 'center',
    backgroundColor : '#F5A623',
    paddingHorizontal: 30,
  },
  dateContainer : {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headTitleText : { fontSize: normalize(20), color: 'white', fontWeight: 'bold' },
  placeholderText: {
    color: '#c9c9c9',
    fontSize: normalize(18),
  },
  contentInput: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentText: {
    fontSize: normalize(18),
  },
  stylish : {
    height: 48,
    borderColor: '#bdbdbd',
    borderWidth: 2,
    borderRadius: 32,
  }

}
export default class DatePickView extends Component {
  constructor(props){
    super(props);
    this.state={
      modalVisible:false,
      allowPointerEvents:true,
      showContent:false,
      selected: '',
      startDate: null,
      endDate: null,
      date: new Date(),
      focus:'startDate',
      clearStart:'',
      clearEnd:'',
      currentDate: moment(),
    }
  }
  isDateBlocked = ( date ) => {
    return date.isBefore(moment(), 'day');
  }
  onDatesChange = (event) => {
    const {currentDate} = event;
    const headFormat = this.props.headFormat || 'MMM DD,YYYY';
    this.setState({ ...this.state, currentDate });
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  onConfirm = () => {
    const returnFormat = this.props.returnFormat || 'YYYY/MM/DD';
    if(this.state.currentDate){
      const outFormat = this.props.outFormat || 'LL';
      this.setState({showContent:true, selected: this.state.currentDate.format(outFormat)});
      this.setModalVisible(false);

      if(typeof this.props.onConfirm === 'function'){
        this.props.onConfirm({currentDate:this.state.currentDate.format(returnFormat)});
      }
    }
    else{
      alert('please select correct date');
    }
    
  }
  getTitleElement() {
    const { placeholder, customStyles = {}, allowFontScaling} = this.props;
    const showContent = this.state.showContent;
    if (!showContent && placeholder) {
      return (
        <Text allowFontScaling={allowFontScaling} style={[styles.placeholderText,customStyles.placeholderText]}>
          {placeholder}
        </Text>
      );
    }
    return (
      <Text allowFontScaling={allowFontScaling} style={[styles.contentText,customStyles.contentText]}>
        {this.state.selected}
      </Text>
    );
  }
  render(){
    const {
      customStyles = {},
    } = this.props;
    
    let style = styles.stylish;
    style = this.props.centerAlign ? { ...style } : style;
    style = { ...style, ...this.props.style };
    const headerContainer = {
      ...styles.headCoverContainer,
      ...customStyles.headerStyle,
    }
    const markTitle = {
      ...styles.headTitleText,
      color:'black',
      opacity: 0.8 ,
      marginBottom: 5,
      fontSize: normalize(18),
      ...customStyles.headerMarkTitle,
    };
    const headerDate = {
      ...styles.headTitleText,
      ...customStyles.headerDateTitle,
    }
    return(
      <TouchableHighlight 
        underlayColor={'transparent'}
        onPress={()=>{this.setModalVisible(true);}}
        style={[{ width:'100%', height:'100%', justifyContent: 'center' },style]}>
        <View>
        <View><View style={[customStyles.contentInput,styles.contentInput]}>{this.getTitleElement()}</View></View>
        <Modal 
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>
          <View stlye={{flex:1, flexDirection:'column'}}>
            <View style={{height:'22%', maxHeight:'22%'}}>
              <View style={headerContainer}>
                <Text style={markTitle}>{this.state.currentDate.format('YYYY')}</Text>
                <Text style={{ fontSize: 40, color:'white', fontWeight:'bold' }} >{this.state.currentDate.format('ddd, MMM D')}</Text>
              </View>
            </View>
            <View style={{height:'68%'}}>
            <DateRange
              onDatesChange={this.onDatesChange}
              isDateBlocked={this.isDateBlocked}
              startDate={this.state.startDate}
              currentDate={this.state.currentDate}
              endDate={this.state.endDate}
              focusedInput={this.state.focus}
              selectedBgColor={this.props.selectedBgColor || undefined}
              selectedTextColor={this.props.selectedTextColor || undefined}
              pick
            />
            </View>
            <View style={{ paddingBottom: '5%',
              width:'100%', height: '10%',flexDirection:'row',justifyContent: 'center', alignItems: 'center'}}>
                <TouchableHighlight
                  underlayColor={'transparent'}
                  onPress={this.onConfirm}
                  style={[{ width: '80%', marginHorizontal: '3%' }, this.props.ButtonStyle]}
                  >
                  <Text style={[{ fontSize:20 }, this.props.ButtonTextStyle]}>{this.props.ButtonText? this.props.ButtonText: "送出"}</Text>
                </TouchableHighlight>
            </View>
          </View>
        </Modal>
        </View>
      </TouchableHighlight>
    )
  }
}
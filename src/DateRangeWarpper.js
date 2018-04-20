import React, { Component } from 'react';
import { View, TouchableHighlight, Modal, Text } from 'react-native';
import DateRange from './DateRangePicker';
import moment from 'moment'; 
import normalize from './normalizeText';

const styles = {
  headCoverContainer: {
    paddingTop:20,
    height: normalize(110),
    width: '100%',
    justifyContent: 'center',
    backgroundColor : '#F5A623',
    paddingHorizontal: 20,
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
export default class DateRangePickerView extends Component {
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
    }
  }
  isDateBlocked = ( date ) => {
    return date.isBefore(moment(), 'day');
  }
  onDatesChange = ({ startDate, endDate ,focusedInput }) => {
    this.setState({ ...this.state, focus: focusedInput }, () => {
      this.setState({ ...this.state, startDate, endDate })
        if(endDate){
          this.setState({clearStart:startDate.format('MMM DD,YYYY'), clearEnd:endDate.format('MMM DD,YYYY')})
        }
        else{
          this.setState({clearStart:startDate.format('MMM DD,YYYY' ), clearEnd:''});
        }
    }
    );
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  onConfirm = () => {
    if(typeof this.props.onConfirm === 'function'){
      this.props.onConfirm();
    }
    if(this.state.startDate && this.state.endDate){
      const start = this.state.startDate.format('LL');
      const end = this.state.endDate.format('LL');
      this.setState({showContent:true, selected:`${start} → ${end}`});
      this.setModalVisible(false);
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
    style = this.props.centerAlign ? { ...style, textAlign: 'center' } : style;
    style = { ...style, ...this.props.style };
    const headerContainer = {
      ...styles.headCoverContainer,
      ...customStyles.headerStyle,
    }
    const markTitle = {
      ...styles.headTitleText,
      color:'black',
      opacity: 0.8 ,
      marginBottom: 15,
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
            <View style={{height:'20%', maxHeight:'20%'}}>
              <View style={headerContainer}>
                <Text style={markTitle}>{this.props.markText? this.props.markText : '選擇日期' }</Text>
              <View style={styles.dateContainer}>
                <Text style={headerDate}>{this.state.clearStart ? this.state.clearStart : 'startDate'}</Text>
                <Text style={styles.headTitleText}>→</Text>
                <Text style={headerDate}>{this.state.clearEnd ? this.state.clearEnd : 'endDate'}</Text>
              </View>
              </View>
            </View>
            <View style={{height:'70%'}}>
            <DateRange
              onDatesChange={this.onDatesChange}
              isDateBlocked={this.isDateBlocked}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              focusedInput={this.state.focus}
              selectedBgColor={this.props.selectedBgColor || undefined}
              selectedTextColor={this.props.selectedTextColor || undefined}
              range
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
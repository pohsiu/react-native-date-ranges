import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import normalize from './normalizeText';
import Month from './Month';

const styles = StyleSheet.create({
  calendar: {
    backgroundColor: 'rgb(255, 255, 255)',
    marginHorizontal: normalize(16),
  },
  headActionContainer: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default class DateRangePicker extends Component {
  constructor(){
    super();
    this.state = {
      currentDate: moment(),
      focusedMonth: moment().startOf('month'),
    }
  }
  previousMonth = () => {
    this.setState({ focusedMonth: this.state.focusedMonth.add(-1, 'M') });
  };
  nextMonth = () => {
    this.setState({ focusedMonth: this.state.focusedMonth.add(1, 'M') });
  };
  render() {
    
    return (
      <View style={styles.calendar}>
        
        <View style={styles.headActionContainer}>
          <TouchableOpacity onPress={this.previousMonth}>
            <Text style={{paddingHorizontal:15, fontSize:18, fontWeight:'bold'}}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={{fontSize:20, color:'black', fontWeight:'bold' }}>{this.state.focusedMonth.format('MMMM YYYY')}</Text>
          <TouchableOpacity onPress={this.nextMonth}>
            <Text style={{paddingHorizontal:15, fontSize:18, fontWeight:'bold'}}>{'>'}</Text>
          </TouchableOpacity>
        </View>
        <Month
          range={this.props.range}
          date={this.props.date}
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          focusedInput={this.props.focusedInput}
          currentDate={this.state.currentDate}
          focusedMonth={this.state.focusedMonth}
          onDatesChange={this.props.onDatesChange}
          isDateBlocked={this.props.isDateBlocked}
          onDisableClicked={this.props.onDisableClicked}
          selectedBgColor={this.props.selectedBgColor}
          selectedTextColor={this.props.selectedTextColor}
        />
      </View>
    );
  }
}


DateRangePicker.propTypes = {
  range: PropTypes.bool,
  date: PropTypes.instanceOf(moment),
  startDate: PropTypes.instanceOf(moment),
  endDate: PropTypes.instanceOf(moment),
  focusedInput: PropTypes.oneOf(['startDate', 'endDate']),
  onDatesChange: PropTypes.func,
  isDateBlocked: PropTypes.func,
  onDisableClicked: PropTypes.func
}




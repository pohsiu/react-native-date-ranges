import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-range';
import Week from './Week';

const styles = {
  week: {
    flexDirection: 'row',
    marginVertical: 5,
    // justifyContent: 'space-between',
  },
  dayName: {
    flexGrow: 1,
    flexBasis: 1,
    textAlign: 'center',
    color:'grey',
    opacity:0.9,
    fontWeight:'bold'
  },
}
export default class Month extends Component{
  render(){
    const {
      mode,
      date,
      startDate,
      endDate,
      focusedInput,
      currentDate,
      focusedMonth,
      onDatesChange,
      isDateBlocked,
      onDisableClicked,
      selectedBgColor,
      selectedTextColor,
    } = this.props;
    const dayNames = []; // store week's each day title 
    const weeks = [];
    const startOfMonth = focusedMonth.clone().startOf('month').startOf('isoweek'); // make startOfMonth is immutable
    const endOfMonth = focusedMonth.clone().endOf('month');                        // same logic as below

    // get the interval of week of first day and last day 
    const weekRange = moment.range(currentDate.clone().startOf('isoweek'), currentDate.clone().endOf('isoweek'));
    weekRange.by('days', (day) => {
      dayNames.push(
        <Text key={day.date()} style={styles.dayName}>
          {day.format('dd')[0]} 
        </Text>
      );
    });
    moment.range(startOfMonth, endOfMonth).by('weeks', (week) => {
      weeks.push(
        <Week
          key={week}
          mode={mode}
          date={date}
          startDate={startDate}
          endDate={endDate}
          focusedInput={focusedInput}
          currentDate={currentDate}
          focusedMonth={focusedMonth}
          startOfWeek={week}
          onDatesChange={onDatesChange}
          isDateBlocked={isDateBlocked}
          onDisableClicked={onDisableClicked}
          selectedBgColor={selectedBgColor}
          selectedTextColor={selectedTextColor}
        />
      );
    });
    return(
      <View style={styles.month}>
        <View style={styles.week}>
          {dayNames}
        </View>
        {weeks}
      </View>
    )
  }
}

Month.propTypes = {
  mode: PropTypes.oneOf(['range', 'single']),
  date: PropTypes.instanceOf(moment),
  startDate: PropTypes.instanceOf(moment),
  endDate: PropTypes.instanceOf(moment),
  focusedInput: PropTypes.oneOf(['startDate', 'endDate']),
  currentDate: PropTypes.instanceOf(moment),
  focusedMonth: PropTypes.instanceOf(moment),
  onDatesChange: PropTypes.func,
  isDateBlocked: PropTypes.func,
  onDisableClicked: PropTypes.func
}
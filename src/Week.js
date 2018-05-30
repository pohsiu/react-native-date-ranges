import React, {Component} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-range';
import { dates } from './dates';
import normalize from './normalizeText';



const styles = {
  week: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  day: {
    flexGrow: 1,
    flexBasis: 1,
    alignItems: 'center',
    // padding: 10,
  },
  dayText: {
    color: 'rgb(0, 0, 0)',
    fontWeight: '600',
    fontSize : normalize(14),
  },
  dayBlocked: {
    backgroundColor: 'rgb(255, 255, 255)'
  },
  daySelected: {
    backgroundColor: "#4597A8",
  },
  
  dayDisabledText: {
    color: 'gray',
    opacity: 0.5,
    fontWeight: '400'
  },
  daySelectedText: {
    color: 'rgb(252, 252, 252)'
  },
  dayStarted : {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  dayEnded : {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  borderContainer : { 
    width:40, 
    height:40, 
    alignItems:'center', 
    justifyContent:'center', 
  }
}

export default class Week extends Component{
  
  render(){
    const {
      mode,
      date,
      startDate,
      endDate,
      focusedInput,
      startOfWeek,
      onDatesChange,
      isDateBlocked,
      onDisableClicked,
      selectedBgColor,
      selectedTextColor,
      currentDate,
    } = this.props;
    const days = [];
    const endOfWeek = startOfWeek.clone().endOf('isoweek');

    moment.range(startOfWeek, endOfWeek).by('days', (day) => {
      
      const onPress = () => {
        if (isDateBlocked(day)) {
          onDisableClicked(day);
        } else if (mode === 'range') {
          let isPeriodBlocked = false;
          const start = focusedInput === 'startDate' ? day : startDate;
          
          const end = focusedInput === 'endDate' ? day : endDate;
          
          if (start && end) {
            moment.range(start, end).by('days', (dayPeriod) => {
              if (isDateBlocked(dayPeriod)) isPeriodBlocked = true;
            });
          }
          onDatesChange(isPeriodBlocked ?
            dates(end, null, 'startDate') :
            dates(start, end, focusedInput));
        } else if (mode === 'single') {
          const input = day;
          onDatesChange({ currentDate: input});
        } else {
          onDatesChange({ date: day });
        }
      };

      const isDateRangeSelected = () => {
        if (mode === 'range') {
          if (startDate && endDate) {
            return day.isSameOrAfter(startDate, 'day') && day.isSameOrBefore(endDate, 'day');
          }
          return (startDate && day.isSame(startDate, 'day')) || (endDate && day.isSame(endDate, 'day'));
        } 
        return date && day.isSame(date, 'day');
      };
      
      const isDateSelected = () => {
        if (mode === 'single') {
          return currentDate && day.isSame(currentDate, 'day');
        }
        return date && day.isSame(date, 'day');
      }
      const isDateStart = () => {
        return startDate && day.isSame(startDate, 'day');
      }
      const isDateEnd = () => {
        return endDate && day.isSame(endDate, 'day');
      }

      const isBlocked = isDateBlocked(day);
      const isRangeSelected = isDateRangeSelected();
      const isStart = isDateStart();
      const isEnd = isDateEnd();
      const isSelected = isDateSelected();

      const dayRangeSelectedStyle = selectedBgColor ? [styles.daySelected,{backgroundColor: selectedBgColor}] : styles.daySelected;
      const daySelectedText = selectedTextColor ? [styles.daySelectedText,{color: selectedTextColor}] : styles.daySelectedText;
      const style = [
        styles.day,
        isBlocked && styles.dayBlocked,
        isRangeSelected && dayRangeSelectedStyle,
        isStart && styles.dayStarted,
        isEnd && styles.dayEnded,
      ];

      const styleText = [
        styles.dayText,
        isBlocked && styles.dayDisabledText,
        isRangeSelected && daySelectedText,
        isSelected && daySelectedText,
      ];
      const borderContainer = (mode === 'single') && isSelected 
        ? [styles.borderContainer,
          { borderRadius:20, 
            backgroundColor: 
              selectedBgColor 
              ? selectedBgColor 
              : styles.daySelected.backgroundColor
          }] 
        : styles.borderContainer;
      days.push(
        <TouchableOpacity
          key={day.date()}
          style={style}
          onPress={onPress}
          disabled={isBlocked && !onDisableClicked}
        >
          <View style={borderContainer}> 
            <Text style={styleText}>{day.date()}</Text>
          </View>
        </TouchableOpacity>
      );
    });
    return(
      <View style={styles.week}>{days}</View>
    )
  }
}

Week.propTypes = {
  mode: PropTypes.oneOf(['range', 'single']),
  date: PropTypes.instanceOf(moment),
  startDate: PropTypes.instanceOf(moment),
  endDate: PropTypes.instanceOf(moment),
  focusedInput: PropTypes.oneOf(['startDate', 'endDate']),
  startOfWeek : PropTypes.instanceOf(moment),
  onDatesChange: PropTypes.func,
  isDateBlocked: PropTypes.func,
  onDisableClicked: PropTypes.func
}
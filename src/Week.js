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
    // justifyContent: 'space-between',
  },
  day: {
    flexGrow: 1,
    flexBasis: 1,
    alignItems: 'center',
    // backgroundColor: 'rgb(245, 245, 245)',
    padding: 10,
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
    // backgroundColor: 'rgb(52,120,246)',
    backgroundColor: "#4597A8"
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
  }
}

export default class Week extends Component{
  
  render(){
    const {
      range,
      date,
      startDate,
      endDate,
      focusedInput,
      startOfWeek,
      onDatesChange,
      isDateBlocked,
      onDisableClicked,
      selectedColor,
    } = this.props;
    const days = [];
    const endOfWeek = startOfWeek.clone().endOf('isoweek');

    moment.range(startOfWeek, endOfWeek).by('days', (day) => {
      
      const onPress = () => {
        if (isDateBlocked(day)) {
          onDisableClicked(day);
        } else if (range) {
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
        } else {
          onDatesChange({ date: day });
        }
      };

      const isDateSelected = () => {
        if (range) {
          if (startDate && endDate) {
            return day.isSameOrAfter(startDate, 'day') && day.isSameOrBefore(endDate, 'day');
          }
          return (startDate && day.isSame(startDate, 'day')) || (endDate && day.isSame(endDate, 'day'));
        }
        return date && day.isSame(date, 'day');
      };
      
      
      const isDateStart = () => {
        return startDate && day.isSame(startDate, 'day');
      }
      const isDateEnd = () => {
        return endDate && day.isSame(endDate, 'day');
      }

      const isBlocked = isDateBlocked(day);
      const isSelected = isDateSelected();
      const isStart = isDateStart();
      const isEnd = isDateEnd();

      const style = [
        styles.day,
        isBlocked && styles.dayBlocked,
        isSelected && [styles.daySelected,{color:selectedColor}],
        isStart && styles.dayStarted,
        isEnd && styles.dayEnded,
      ];

      const styleText = [
        styles.dayText,
        isBlocked && styles.dayDisabledText,
        isSelected && styles.daySelectedText
      ];

      days.push(
        <TouchableOpacity
          key={day.date()}
          style={style}
          onPress={onPress}
          disabled={isBlocked && !onDisableClicked}
          // onLayout={(event)=>console.log(event.nativeEvent.layout)}
        >
          <Text style={styleText}>{day.date()}</Text>
        </TouchableOpacity>
      );
    });
    return(
      <View style={styles.week}>{days}</View>
    )
  }
}

Week.propTypes = {
  range: PropTypes.bool,
  date: PropTypes.instanceOf(moment),
  startDate: PropTypes.instanceOf(moment),
  endDate: PropTypes.instanceOf(moment),
  focusedInput: PropTypes.oneOf(['startDate', 'endDate']),
  startOfWeek : PropTypes.instanceOf(moment),
  onDatesChange: PropTypes.func,
  isDateBlocked: PropTypes.func,
  onDisableClicked: PropTypes.func
}
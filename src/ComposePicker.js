import React, { Component } from 'react';
import { View, TouchableHighlight, Modal, Text } from 'react-native';
import PropTypes from 'prop-types';
import DateRange from './DateRange';
import moment from 'moment';
import normalize from './normalizeText';

const styles = {
  placeholderText: {
    color: '#c9c9c9',
    fontSize: normalize(18)
  },
  contentInput: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentText: {
    fontSize: normalize(18)
  },
  stylish: {
    height: 48,
    borderColor: '#bdbdbd',
    borderWidth: 2,
    borderRadius: 32
  }
};
export default class ComposePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      allowPointerEvents: true,
      showContent: false,
      selected: '',
      startDate: null,
      endDate: null,
      date: new Date(),
      focus: 'startDate',
      currentDate: moment()
    };
  }
  isDateBlocked = date => {
    if (this.props.blockBefore) {
      return date.isBefore(moment(), 'day');
    } else if (this.props.blockAfter) {
      return date.isAfter(moment(), 'day');
    }
    return false;
  };
  onDatesChange = event => {
    const { startDate, endDate, focusedInput, currentDate } = event;
    if (currentDate) {
      this.setState({ currentDate });
      return;
    }
    this.setState({ ...this.state, focus: focusedInput }, () => {
      this.setState({ ...this.state, startDate, endDate });
    });
  };
  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };
  onConfirm = () => {
    const { 
      returnFormat = 'YYYY/MM/DD',
      outFormat = 'LL',
      mode,
      onConfirm,
    } = this.props;
    if (!mode || mode === 'single') {
      this.setState({
        showContent: true,
        selected: this.state.currentDate.format(outFormat)
      });
      this.setModalVisible(false);
      if (typeof onConfirm === 'function') {
        onConfirm({
          currentDate: this.state.currentDate.format(returnFormat)
        });
      }
      return;
    }
    const { startDate, endDate } = this.state;
    if (startDate && endDate) {
      const start = startDate.format(outFormat);
      const end = endDate.format(outFormat);
      this.setState({
        showContent: true,
        selected: `${start} ${this.props.dateSplitter} ${end}`
      });
      this.setModalVisible(false);

      if (typeof onConfirm === 'function') {
        onConfirm({
          startDate: startDate.format(returnFormat),
          endDate: endDate.format(returnFormat)
        });
      }
    } else {
      alert('please select correct date');
    }
  };
  getTitleElement() {
    const { placeholder, customStyles = {}, allowFontScaling } = this.props;
    const { showContent } = this.state;
    if (!showContent && placeholder) {
      return (
        <Text
          allowFontScaling={allowFontScaling}
          style={[styles.placeholderText, customStyles.placeholderText]}
        >
          {placeholder}
        </Text>
      );
    }
    return (
      <Text
        allowFontScaling={allowFontScaling}
        style={[styles.contentText, customStyles.contentText]}
      >
        {this.state.selected}
      </Text>
    );
  }

  renderButton = () => {
    const { customButton } = this.props;

    if (customButton) {
      return customButton(this.onConfirm);
    }
    const { ButtonTextStyle, ButtonText, ButtonStyle } = this.props;
    return (
      <TouchableHighlight
        underlayColor={'transparent'}
        onPress={this.onConfirm}
        style={[
          { width: '80%', marginHorizontal: '3%' },
          ButtonStyle
        ]}
      >
        <Text style={[{ fontSize: 20 }, ButtonTextStyle]}>
          {ButtonText ? ButtonText : '送出'}
        </Text>
      </TouchableHighlight>
    );
  };

  render() {
    const {
      customStyles = {},
      centerAlign,
      style: newStyle,
      headFormat,
      markText,
      selectedBgColor,
      selectedTextColor,
      mode,
    } = this.props;
    const {
      modalVisible,
      startDate,
      endDate,
      focus,
      currentDate,
    } = this.state;
    let style = styles.stylish;
    style = centerAlign ? { ...style } : style;
    style = { ...style, ...newStyle };

    return (
      <TouchableHighlight
        underlayColor={'transparent'}
        onPress={() => {
          this.setModalVisible(true);
        }}
        style={[
          { width: '100%', height: '100%', justifyContent: 'center' },
          style
        ]}
      >
        <View>
          <View>
            <View style={[customStyles.contentInput, styles.contentInput]}>
              {this.getTitleElement()}
            </View>
          </View>
          <Modal
            animationType="slide"
            onRequestClose={() => this.setModalVisible(false)}
            transparent={false}
            visible={modalVisible}
          >
            <View stlye={{ flex: 1, flexDirection: 'column' }}>
              <View style={{ height: '90%' }}>
                <DateRange
                  headFormat={headFormat}
                  customStyles={customStyles}
                  markText={markText}
                  onDatesChange={this.onDatesChange}
                  isDateBlocked={this.isDateBlocked}
                  startDate={startDate}
                  endDate={endDate}
                  focusedInput={focus}
                  selectedBgColor={selectedBgColor || undefined}
                  selectedTextColor={selectedTextColor || undefined}
                  mode={mode || 'single'}
                  currentDate={currentDate}
                />
              </View>
              <View
                style={{
                  paddingBottom: '5%',
                  width: '100%',
                  height: '10%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {this.renderButton()}
              </View>
            </View>
          </Modal>
        </View>
      </TouchableHighlight>
    );
  }
}

ComposePicker.propTypes = {
  dateSplitter: PropTypes.string
};

ComposePicker.defaultProps = { dateSplitter: '->' };

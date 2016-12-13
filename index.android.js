/**
 * author:徐航
 * time:2016年12月13日14:49:52
 * blogs:http://www.iloveplus.cn
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Calendar from './library/components/Calendar';

export default class CalendarDemo extends Component {
  constructor(props) {
    super(props);
    this.state={
      selectDates:[],
      data:{
        month:"2016-12",
        data:[{date:"2016-12-11",eventData:[{title:"参加会议",id:"001"}]},
          {date:"2016-12-15",eventData:[{title:"准点吃饭",id:"002"}]},
          {date:"2016-12-26",eventData:[{title:"参加会议",id:"003"}]}]
      }
    }
  }

  _selectDate=(selectDates)=>{
    this.setState({selectDates});
  };

  _onScroll=(month)=>{
    alert(month);
    this.setState({selectDates:[]});
  };

  render() {
    return (
        <Calendar
            currentMonthData={this.state.data}
            onScroll={this._onScroll}
            onPick={this._selectDate}
        />
    );
  }
}

AppRegistry.registerComponent('calendar', () => CalendarDemo);

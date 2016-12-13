/**
 * author:徐航
 * time:2016年12月13日14:49:52
 * blogs:http://www.iloveplus.cn
 */

import React, {Component} from 'react';
import {
    Text,
    TouchableHighlight,
    View,
    Dimensions
} from 'react-native';
import {dayStyle} from "../styles/calendar";

let windowWidth=Dimensions.get('window').width;

export default class Day extends Component {
    constructor(props) {
        super(props);
    }

    onPress() {
        if (this.props.disabled) {
            return;
        }
        this.props.onPress();
    }

    _renderDay(isWeekend, isSelected, isToday,isCurrentSelected,caption,eventData){
        let style;
        if(isCurrentSelected){
            style={
                circle:dayStyle.currentSelectCircle,
                text:dayStyle.currentSelectText,
            }
        }else if(isSelected){
            style={
                circle:dayStyle.selectCircle,
                text:dayStyle.selectText,
            }
        }else{
            style={
                circle:dayStyle.circle,
                text:isToday?dayStyle.todayText:(isWeekend?dayStyle.weekEndText:dayStyle.captionText),
            }
        }
        return (
            <View style={dayStyle.item}>
                <View style={[dayStyle.caption,style.circle]}><Text style={[dayStyle.captionText,style.text]}>{caption}</Text></View>
                {eventData.length>0&&<View style={dayStyle.dot}/>}
            </View>
        )
    }

    getEventData(){
        return this.props.eventData;
    }

    render() {
        const {
            isBlank,
            isWeekend,
            isSelected,
            isCurrentSelected,
            isToday,
            caption,
            eventData,
            date
        } = this.props;

        if(isBlank){
            return (
                <View style={[dayStyle.item]}/>
            )
        }
        return (
            <TouchableHighlight underlayColor='transparent' onPress={()=>{this.props.onSlectDate(isSelected,date)}}>
                {this._renderDay(isWeekend, isSelected, isToday,isCurrentSelected,caption,eventData)}
            </TouchableHighlight>
        )
    }
}

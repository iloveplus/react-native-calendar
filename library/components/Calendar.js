/**
 * author:徐航
 * time:2016年12月13日14:49:52
 * blogs:http://www.iloveplus.cn
 */

import React, {Component, PropTypes} from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    ListView,
    InteractionManager,
    Dimensions
} from 'react-native';
import moment from 'moment';
import {monthStyle} from "../styles/calendar";
import Day from "./Day";

let windowWidth=Dimensions.get('window').width;

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state={
            selectDates:[],
            currentSelected:"",
            eventData:[],
            scrollEnabled: true,
            currentMonth:moment().format('YYYY-MM')
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            setTimeout(() => this.scrollToItem(), 0)
        });
    }

    componentDidUpdate() {
        InteractionManager.runAfterInteractions(() => {
            this.scrollToItem();
        });
    };

    scrollToItem() {
        const scrollToX = windowWidth;
        if (this.state.scrollEnabled) {
            this.refs.calendar.scrollTo({y: 0, x: scrollToX, animated: false});
        }
    };

    static defaultProps = {
        dayHeadings: ['周天', '周一', '周二', '周三', '周四', '周五', '周六']
    };

    renderHeading() {
        return (
            <View style={monthStyle.head}>
                {
                    this.props.dayHeadings.map((item,index)=>{
                        return <Text key={index} style={[index === 0 || index === 6 ? dayStyle.weekEndText : dayStyle.captionText,monthStyle.headText]}> {item}
                        </Text>
                    })
                }
            </View>
        )
    };

    _onSelectDate(date){
        var index=this.state.selectDates.indexOf(date);
        if(index<0){
            this.state.selectDates.push(date);
            this.state.currentSelected=date;
        }else{
            this.state.selectDates.splice(index,1);
            this.state.currentSelected=this.state.selectDates[this.state.selectDates.length-1]||"";
        }
        this.state.eventData = this.refs[this.state.currentSelected] ? this.refs[this.state.currentSelected].getEventData() : [];
        this.props.onPick(this.state.selectDates);
        this.setState({selectDates:this.state.selectDates,currentSelected:this.state.currentSelected,eventData:this.state.eventData});
    }

    renderDays(date,flag){
        var weekDay=moment(date,"YYYY-MM").startOf('month')._d.getDay(); //本月第一天是星期几
        var days=moment(date, "YYYY-MM").daysInMonth(); //本月一共有多少天

        var monRows=[],mondays=[];
        for(var i=0;i<weekDay+days;i++){
            let curDay=i-weekDay+1;
            let curDate=curDay < 10 ? date + "-0" + curDay : date + "-" + curDay;
            let eventDate=[];

            if(i % 7 === 6){
                mondays.push(<Day isWeekend={true} ref={curDate} onSlectDate={()=>{flag && this._onSelectDate(curDate)}} key={i} date={curDate} isSelected={flag && this.state.selectDates.indexOf(curDate)>=0} isToday={false} isBlank={false} isCurrentSelected={flag && this.state.currentSelected==curDate} caption={curDay} eventData={[curDate,"today"]}/>)
                monRows.push(
                    <View style={monthStyle.row} key={`row${i}`}>
                        {
                            mondays.map((item)=>{return item})
                        }
                    </View>
                )
                mondays=[];
            }else{
                if(i<weekDay){
                    mondays.push(<Day isBlank={true} key={i}/>)
                }else{
                    mondays.push(<Day isWeekend={i % 7 === 0} ref={curDate} onSlectDate={()=>{flag && this._onSelectDate(curDate)}} key={i} date={curDate} isSelected={flag && this.state.selectDates.indexOf(curDate)>=0} isToday={false} isBlank={false} isCurrentSelected={flag && this.state.currentSelected==curDate} caption={curDay} eventData={[]}/>)
                }
            }

            if(curDay === days &&i % 7 !== 6){
                monRows.push(<View style={monthStyle.row} key={`row${i}`}>
                    {
                        mondays.map((item)=>{return item})
                    }
                </View>)
            }
        }
        return monRows;
    }

    renderEvent(){
        return (
            <ListView style={{flex:1,backgroundColor:"#ffffff",marginTop:12}}
                      automaticallyAdjustContentInsets={true}
                      enableEmptySections={true}
                      removeClippedSubviews={false}
                      dataSource={new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2}).cloneWithRows(this.state.eventData||[])}
                      renderRow={this._renderEventRow}/>
        )
    }

    _renderEventRow = (rowData, sectionID, rowID) => {
        return (
            <TouchableHighlight
                onPress={() => alert(rowData)}
                underlayColor='#F5FCFF' style={{height:30,backgroundColor:"green"}}>
                <Text>{rowData}</Text>
            </TouchableHighlight>
        )
    };

    scrollEnded(event) {
        const position = event.nativeEvent.contentOffset.x;
        const currentPage = position / windowWidth;
        if(currentPage<1){
            const newMoment = moment(this.state.currentMonth + "-01").add(-1, 'month').format("YYYY-MM");
            this.props.onScroll(newMoment);
            this.setState({currentMonth: newMoment,selectDates: [],scrollEnabled:true,eventData:[]});
        }else if(currentPage>1){
            const newMoment = moment(this.state.currentMonth + "-01").add(1, 'month').format("YYYY-MM");
            this.props.onScroll(newMoment);
            this.setState({currentMonth: newMoment,selectDates: [],scrollEnabled:true,eventData:[]});
        }
    };

    render() {
        return (
            <View style={{flex:1,backgroundColor:"#eeeeee"}}>
                <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",height:45,backgroundColor:"white"}}>
                    <Text style={{fontSize:18}}>{this.state.currentMonth}</Text>
                </View>
                {this.renderHeading()}
                <ScrollView
                    style={{flex:1,width:windowWidth}}
                    ref={"calendar"}
                    horizontal
                    scrollEnabled
                    pagingEnabled
                    removeClippedSubviews
                    scrollEventThrottle={1000}
                    showsHorizontalScrollIndicator={false}
                    automaticallyAdjustContentInsets
                    onMomentumScrollEnd={(event) => this.scrollEnded(event)}
                >
                    <View style={{flex:1}}>
                        {this.renderDays(moment(this.state.currentMonth + "-01").add(-1, 'months').format("YYYY-MM"),false).map((item)=>{return item})}
                        {this.renderEvent()}
                    </View>
                    <View style={{flex:1}}>
                        {this.renderDays(this.state.currentMonth,true).map((item)=>{return item})}
                        {this.renderEvent()}
                    </View>
                    <View style={{flex:1}}>
                        {this.renderDays(moment(this.state.currentMonth + "-01").add(1, 'months').format("YYYY-MM"),false).map((item)=>{return item})}
                        {this.renderEvent()}
                    </View>
                </ScrollView>
            </View>
        )
    }
}
export default Calendar;

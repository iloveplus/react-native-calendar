/**
 * author:徐航
 * time:2016年12月13日14:49:52
 * blogs:http://www.iloveplus.cn
 */

import React, {
    StyleSheet,
    Dimensions
} from 'react-native';

let windowWidth=Dimensions.get('window').width;

dayStyle = StyleSheet.create({
    item:{
        width:windowWidth/7,
        height:53,
        justifyContent:"flex-start",
        alignItems:"center"
    },
    caption:{
        width:30,
        height:30,
        borderRadius:15,
        backgroundColor:"red",
        justifyContent:"center",
        alignItems:"center",
        marginTop:8

    },
    captionText:{
        fontSize:16,
        color:"#666666"
    },
    dot:{
        marginTop: 3,
        backgroundColor: '#d5d5d5',
        width:6,
        height: 6,
        borderRadius: 3,
    },
    currentSelectCircle:{
        backgroundColor:"#27a2f8"
    },
    currentSelectText:{
        color:"white"
    },
    selectCircle:{
        backgroundColor:"#d5eeff"
    },
    selectText:{
        color:"#5a92c2"
    },
    circle:{
        backgroundColor:"transparent"
    },
    weekEndText:{
        color:"#cccccc"
    },
    todayText:{
        color:"red"
    }
})

monthStyle = StyleSheet.create({
    row:{
        width:windowWidth,
        flexDirection:"row",
        height:53,
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:"#cccccc",
        backgroundColor:"white"
    },
    head:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        height:40,
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:"#cccccc",
        backgroundColor:"#eeeeee"
    },
    headText:{
        flex:1,
        fontSize:14,
        textAlign:"center"
    }
})

module.exports ={dayStyle,monthStyle}
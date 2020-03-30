<template>
    <div class="showdata">
      <div class="showTit">底盘试验室-MOOG液压伺服试验系统
        <!-- <img src="../assets/img/logo.png" class="logo" alt=""> -->
      </div>
      <div class="show-nav">
        <div class="back">
          <img src="../assets/img/fanhui.png" alt="" @click="goBack">
        </div>
        <div class="name">单站台运行状态-{{$route.query.name}}</div>
        <router-link tag="div" to="dataBrowser" class="Godata">Data Browser </router-link>
      </div>
      <div class="show-con">
        <div class="sta-left">
          <div class="img-box">
            <img :src="proData.current_application_state === 1 ? yaImgEd : yaImg " alt="">
          </div>
          <div class="status-name">设备状态</div>
          <div class="name">Actuator status</div>
          <div class="status-box">
            <div class="row">
              <div class="image-box">
                <img :src="proData.current_application_state === 1 ? P : PD" alt="">
              </div>
              <div class="name">Play</div>
            </div>
            <div class="row">
              <div class="image-box">
                <img :src="proData.current_application_state === -1 ? S : SD" alt="">
              </div>
              <div class="name">Stop</div>
            </div>
          </div>
          <div class="border-f"></div>
          <div class="name">MainfoldPressure</div>
          <div class="status-box">
            <div class="row">
              <div class="image-box">
                <img :src="proData.pressure_state === 'H' ? H : HD" alt="">
              </div>
              <div class="name">High<br>pressure</div>
            </div>
            <div class="row">
              <div class="image-box">
                <img :src="proData.pressure_state === 'L' ? L : LD" alt="">
              </div>
              <div class="name">Low<br>perssure</div>
            </div>
            <div class="row">
              <div class="image-box">
                <img :src="proData.pressure_state === 'F' ? F : FD" alt="">
              </div>
              <div class="name">Safety limit<br>exceeded</div>
            </div>
            <div class="row">
              <div class="image-box">
                <img :src="proData.pressure_state === 'N' ? N : ND" alt="">
              </div>
              <div class="name">Station<br>inactive</div>
            </div>
          </div>
          <div class="bot-btn">
            <p>设备管理：</p>
            <p>负责人：马某</p>
          </div>
        </div>
        <div class="sta-right">
          <div id="charts"></div>
          <div class="num-box">
            <div class="cur-left">
              <div class="cur-top">
                <div class="current">
                  <div class="tit">Current cycle</div>
                  <div class="number">{{proData.current_cycle}}</div>
                </div>
                <div class="duration">
                  <div class="tit">Duration</div>
                  <div class="content-durat">
                    <div class="row">
                      <div class="cal"></div>
                      <div class="cal">dd</div>
                      <div class="cal">:</div>
                      <div class="cal">hh</div>
                      <div class="cal">:</div>
                      <div class="cal">min</div>
                      <div class="cal">:</div>
                      <div class="cal">ss</div>
                    </div>
                    <div class="row">
                      <div class="cal">Time remaining</div>
                      <div class="cal" v-if="proData.time_remaining">{{proData.time_remaining[0]}}</div>
                      <div class="cal">:</div>
                      <div class="cal" v-if="proData.time_remaining">{{proData.time_remaining[1]}}</div>
                      <div class="cal">:</div>
                      <div class="cal" v-if="proData.time_remaining">{{proData.time_remaining[2]}}</div>
                      <div class="cal">:</div>
                      <div class="cal" v-if="proData.time_remaining">{{proData.time_remaining[3]}}</div>
                    </div>
                    <div class="row">
                      <div class="cal">Total time</div>
                      <div class="cal" v-if="proData.total_time">{{proData.total_time[0]}}</div>
                      <div class="cal">:</div>
                      <div class="cal" v-if="proData.total_time">{{proData.total_time[1]}}</div>
                      <div class="cal">:</div>
                      <div class="cal" v-if="proData.total_time">{{proData.total_time[2]}}</div>
                      <div class="cal">:</div>
                      <div class="cal" v-if="proData.total_time">{{proData.total_time[3]}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cur-bot">
                <div class="tit">Overall progress</div>
                <div class="jin">
                  <div class="nei" :style="{'width': proData.process + '%'}"></div>
                </div>
                <div class="jin-name">{{proData.process}}% Complete</div>
              </div>
            </div>
            <div class="cur-right">
              <div class="tit" style="text-indent: 17px">Overall progress</div>
              <div class="tab-tit">
                <div class="name">Property name</div>
                <div class="value">Value</div>
              </div>
              <div class="tab-List">
                <div class="basic">Basic</div>
                <div class="cyde-row">
                  <div class="name">stop_cycle</div>
                  <div class="value">{{proData.stop_cycle}}</div>
                </div>
                <div class="cyde-row">
                  <div class="name">waveform_type</div>
                  <div class="value">{{proData.waveform_type}}</div>
                </div>
                <div class="cyde-row">
                  <div class="name">frequency</div>
                  <div class="value">{{proData.frequency}}</div>
                </div>
                <div class="cyde-row">
                  <div class="name">amplitude</div>
                  <div class="value">{{proData.amplitude}}</div>
                </div>

                <div class="cyde-row">
                  <div class="name">type</div>
                  <div class="value">{{proData.current_application_type}}</div>
                </div>

                <div class="cyde-row">
                  <div class="name">enabled</div>
                  <div class="value">{{proData.enabled}}</div>
                </div>

                <div class="cyde-row">
                  <div class="name">control_loop_state</div>
                  <div class="value">{{proData.control_loop_state}}</div>
                </div>

                <div class="cyde-row">
                  <div class="name">transducer_name</div>
                  <div class="value">{{proData.transducer_name}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "showData",
      data(){
          return{
            options:{
              legend : { //图标
                show : true,
                right:50,
                itemGap : 10,
                itemWidth : 30,
                itemHeight : 10,
                textStyle:{
                  // color:'#C3CAD9'
                }
              },
              color: ['#3398DB'],//  柱状图颜色
              backgroundColor:'#FFFFFF',
              // tooltip : { //鼠标悬停提示内容
              //     trigger: 'axis',
              //     axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              //         type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              //     }
              // },
              grid: { //布局   控制图的大小，调整下面这些值就可以
                left: '1%',
                right: '1%',
                bottom: '1%',
                containLabel: true
                //y2 : 40
                // y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
              },
              yAxis : [ //两个y轴
                {
                  type : 'value',
                  scale:'true',
                  axisLabel : {
                    show : true,
                    interval : 'auto',
                    formatter : '{value}',
                    textStyle:{
                      color:'#228FFE',				//Y轴文字颜色

                      //  F15D23
                    }
                  },
                  splitNumber : 10,
                  splitLine : {
                    show : true,
                    lineStyle : {
                      type : 'dashld',
                      color:'#253556'
                    }
                  },
                  axisLine:{
                    lineStyle:{
                      color:'#253556',				//y轴 轴线颜色
                    }
                  },
                  splitArea : {
                    show : false
                  },
                  max:function (value) {
                    return (value.max + 1).toFixed(2);
                  },
                  min:function (value) {
                    return (value.min - 1).toFixed(2);
                  },
                } ,
                {

                  type : 'value',
                  scale:'true',
                  axisLabel : {
                    show : true,
                    interval : 'auto',
                    formatter : '{value}',
                    textStyle:{
                      color:'#2EAAB3',				//Y轴文字颜色
                    }
                  },
                  splitNumber : 10,
                  splitLine : {
                    show : false,
                    lineStyle : {
                      type : 'dashld',
                      color:'#253556'
                    }
                  },
                  axisLine:{
                    lineStyle:{
                      color:'#253556',				//y轴 轴线颜色
                    }
                  },
                  splitArea : {
                    show : false
                  },
                  max:function (value) {
                    return (value.max + 1).toFixed(2);
                  },
                  min:function (value) {
                    return (value.min - 1).toFixed(2);
                  },
                }
              ],
              series:[],
              xAxis:[]
            },
            datawen:[],
            datashi:[],
            dataX:[],
            F:require("../assets/img/safety.png"),
            N:require("../assets/img/station.png"),
            L:require("../assets/img/low.png"),
            H:require("../assets/img/high.png"),
            FD:require("../assets/img/safetyed.png"),
            ND:require("../assets/img/stationed.png"),
            LD:require("../assets/img/lowed.png"),
            HD:require("../assets/img/highed.png"),
            P:require("../assets/img/play.png"),
            PD:require("../assets/img/played.png"),
            S:require("../assets/img/stop.png"),
            SD:require("../assets/img/stoped.png"),
            proData:{},
            yaImg:require("../assets/img/ya.jpg"),
            yaImgEd:require("../assets/img/yaj.gif")
          }
      },
      methods:{
        goBack(){
          this.$router.go(-1)
        },
        initWebSocketTwo(){
          var str_rep=this.$route.query.name.replace(/\+/g,"");
          console.log(str_rep)
          const wsuri = `ws://www.kongfunion.club/ws/project/fp_${this.$route.query.ip}_${str_rep}/`;
          this.websockTwo = new WebSocket(wsuri);//这里面的this都指向vue
          this.websock.onopen = this.websocketopenTwo;
          this.websockTwo.onmessage = this.websocketonmessageTwo;
          this.websockTwo.onclose = this.websocketcloseTwo;
        },
        initWebSocket() {
          var str_rep=this.$route.query.name.replace(/\+/g,"");
          const wsuri = `ws://www.kongfunion.club/ws/project/station_${this.$route.query.ip}_${str_rep}/`;
          this.websock = new WebSocket(wsuri);//这里面的this都指向vue
          this.websock.onopen = this.websocketopen;
          this.websock.onmessage = this.websocketonmessage;
          this.websock.onclose = this.websocketclose;
          this.websock.onerror = this.websocketerror;
        },
        websocketopen() {//打开
          // console.log("WebSocket连接成功")
        },
        websocketonmessage(e) { //数据接收
          let ObjData = JSON.parse(e.data);
          console.log(ObjData)
          this.proData = ObjData.text
          // console.log(this.proData.current_application_state)
        },
        websocketclose() {  //关闭
          // console.log("WebSocket关闭");1

        },
        websocketerror() {  //失败
          //  console.log("WebSocket连接失败");
        },
        websocketonmessageTwo(e){
          var chart = this.$echarts.init(document.getElementById("charts"));
          let ObjData = JSON.parse(e.data);
          // console.log(ObjData )
          if(this.datawen.length > 100){
            this.datawen.shift();
            this.datashi.shift();
            this.dataX.shift();
          }
          this.datawen.push(ObjData.text.force)
          this.datashi.push(ObjData.text.position)
          this.dataX.push(ObjData.text.time)
          chart.setOption(this.options,true);
        }
      },
      mounted() {
        this.initWebSocket();
        this.initWebSocketTwo();
        var chart = this.$echarts.init(document.getElementById("charts"));
        this.options.series = []
        this.options.xAxis = [];
        var _that = this
        _that.options.series.push( {
          name : 'force',
          type : 'line',
          barMaxWidth:100,
          smooth : true, //光滑的曲线
          symbol: 'none',
          yAxisIndex : '0',
          itemStyle: {
            normal: {
              color: '#228FFE', //改变折线点的颜色
              lineStyle: {
                color: '#228FFE' //改变折线颜色
              }
            }
          },
          data : _that.datawen
        });
        _that.options.series.push( {
          name : 'position',
          type : 'line',
          barMaxWidth:100,
          smooth : true, //光滑的曲线
          yAxisIndex : '1',
          symbol: 'none',
          itemStyle: {
            normal: {
              color: '#0FA1A5', //改变折线点的颜色
              lineStyle: {
                color: '#0FA1A5' //改变折线颜色
              }
            }
          },
          data : _that.datashi
        });
        _that.options.xAxis.push({
            type : 'category',
            data : _that.dataX,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel:{
              interval:20,
              textStyle:{
                color:'#657CA8',				//X轴文字颜色
              }
            },
            axisLine:{
              lineStyle:{
                color:'#253556',				//X轴 轴线颜色
              }
            },
            boundaryGap:false,
            splitLine : {
              show : true,
              lineStyle : {
                width:1,
                type : 'dashld',
                color:'#0A1632'
              }
            },
          });
        chart.setOption(this.options,true);
      },
      destroyed() {
        this.websock.close() //离开路由之后断开websocket连接
        this.websockTwo.close() //离开路由之后断开websocket连接
        this.datawen = [];
        this.datashi = [];
        this.dataX = [];
      },
    }
</script>

<style scoped lang="scss">
  .showdata{
    width:1366px;
    height:768px;
    position:fixed;
    left: 50%;
    top: 50%;
    margin-left:-683px;
    margin-top:-384px;
    .showTit{
      width: 1351px;
      height: 60px;
      background: #FFFFFF;
      padding-left: 15px;
      font-size: 18px;
      color:#333333;
      line-height: 60px;
      position: relative;
      .logo{
        position: absolute;
        right:30px;
        top: 3px;
      }
    }
    .show-nav{
      width:1366px;
      height:50px;
      background:#ffffff;
      background-image: url("../assets/img/navbj.png");
      >div{
        float: left;
        img{
          margin-top: 9px;
          margin-left: 17px;
          margin-right: 16px;
          cursor: pointer;
        }
      }
      .name{
        font-size:24px;
        color:rgba(63,106,243,1);
        line-height:50px;
      }
      .Godata{
        float: right;
        width:160px;
        height:30px;
        background:rgba(66,108,243,1);
        border-radius:10px;
        font-size:20px;
        color:rgba(255,255,255,1);
        line-height:30px;
        text-align: center;
        margin-top: 10px;
        margin-right: 44px;
        cursor: pointer;
      }
    }
    .show-con{
      width:1366px;
      height:658px;
      padding: 16px 0 16px 17px;
      box-sizing: border-box;
      background-image: url("../assets/img/conbj.png");
      .sta-left{
        float: left;
        width: 410px;
        height: 100%;
        border-right: 1px solid #B1C1D6;
        position: relative;

        .img-box{
          width: 394px;
          height: 207px;
          margin-top: 7px;
          img{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .status-name{
          font-size:16px;
          color:rgba(18,61,168,1);
          line-height:16px;
          margin-top: 22px;
        }
        .name{
          font-size:15px;
          color:rgba(51,51,51,1);
          line-height:15px;
          margin-top: 19px;
          margin-bottom: 10px;
        }
        .status-box{
          overflow: hidden;
          >div{
            float: left;
            margin-right: 23px;
            .image-box{
              img{
                display: block;
                width: 77px;
                height: 77px;
              }
            }
            .name{
              font-size:14px;
              color:rgba(18,61,168,1);
              text-align: center;
              margin: 0;
            }
          }
        }
        .border-f{
          width:380px;
          height:1px;
          background:rgba(225,234,248,1);
          margin-top: 20px;
          margin-bottom: 25px;
        }
        .bot-btn{
          width:294px;
          height:50px;
          background:linear-gradient(0deg,rgba(190,190,190,1) 0%,rgba(190,190,190,1) 0%,rgba(235,241,241,1) 53%,rgba(190,190,190,1) 100%);
          position: absolute;
          left: 16px;
          bottom: 0;
          p{
            font-size:16px;
            color:rgba(51,51,51,1);
            line-height:25px;
          }
        }
      }
      .sta-right{
        float: left;
        width: 937px;
        height: 100%;
        #charts{
          width: 826px;
          height: calc(100% - 277px);
          margin-bottom: 20px;
          margin-left: 48px;
        }
        .num-box{
          width: 826px;
          height: 257px;
          margin-left: 48px;
          .tit{
          font-size:20px;
          color:rgba(22,41,81,1);
          }
          .cur-left{
            width:479px;
            height:257px;
            float: left;
            .cur-top{
              overflow: hidden;
              >div{
                float: left;
                background:rgba(255,254,248,1);
                border:1px solid rgba(109, 152, 214, 1);
                box-shadow:0 0 10px 0 rgba(36,44,64,0.4);
                padding-top: 9px;
                padding-left: 16px;
              }
              .current{
                width:212px;
                height:161px;
                .number{
                  font-size:60px;
                  color:rgba(222,26,0,1);
                  margin-top: 14px;
                  text-align: center;
                }
              }
              .duration{
                width:231px;
                height:161px;
                .content-durat{
                  width: 100%;
                  .row{
                    display: flex;
                    justify-content: space-around;
                    margin-top: 22px;
                    .cal{
                      font-size: 12px;
                      &:first-child{
                        width: 90px;
                      }
                    }
                    &:nth-child(2),&:nth-child(3){
                      .cal{
                        color: #DE1A00;
                        &:first-child{
                          color: #162951;
                        }
                      }
                    }
                  }

                }
              }
            }
            .cur-bot{
              width:463px;
              height:75px;
              background:rgba(255,254,248,1);
              border:1px solid rgba(109, 152, 214, 1);
              box-shadow:0px 0px 10px 0px rgba(36,44,64,0.4);
              padding: 9px 0 0 16px;
              .jin{
                width:445px;
                height:13px;
                background:rgba(235,235,235,1);
                box-shadow:0px 0px 2px 0px rgba(39,39,39,0.4);
                border-radius:3px;
                margin: 6px 0;
                .nei{
                  width: 0;
                  height: 100%;
                  background:rgba(109,152,214,1);
                  border-radius:2px;
                }
              }
              .jin-name{
                float: right;
                font-size:14px;
                color:rgba(18,44,133,1);
                margin-right: 16px;
              }
            }
          }
          .cur-right{
            width:345px;
            float: left;
            height:245px;
            background:rgba(255,254,248,1);
            border:1px solid rgba(109, 152, 214, 1);
            box-shadow:0px 0px 20px 0px rgba(36,44,64,0.4);
            padding-top: 10px;
            .tab-tit{
              width: 100%;
              height: 16px;
              margin-top: 5px;
              >div{
                height: 100%;
                background: #7791EB;
                font-size:12px;
                color:rgba(255,255,255,1);
                line-height:16px;
                text-indent: 11px;
                width: 50%;
                float: left;
              }
            }
            .tab-List{
              width: 100%;
              height: calc( 100% - 47px);
              overflow-x: hidden;
              overflow-y: auto;

              &::-webkit-scrollbar {/*滚动条整体样式*/
                width: 20px;     /*高宽分别对应横竖滚动条的尺寸*/
                height: 4px;
                display: none;
              }
              &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                border-radius: 5px;
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                background: #06A9AF;
                display: none;
              }
              &::-webkit-scrollbar-track {/*滚动条里面轨道*/
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                border-radius: 0;
                background: rgba(0,0,0,0.1);
                display: none;
              }

            }
            .cyde-row{
              width: 100%;
              height: 16px;
              background: #ffffff;
              >div{
                width: 50%;
                float: left;
                line-height:16px;
                text-indent: 11px;
                height: 100%;
                font-size:12px;
                color:rgba(22,41,81,1);
              }
              &:nth-child(2n){
                background: #D5E6FF;
              }
            }
            .basic{
              height:16px;
              font-size:12px;
              color:rgba(22,41,81,1);
              line-height:16px;
              text-indent: 20px;
            }
          }
        }
      }
    }
  }
</style>

































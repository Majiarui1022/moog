<template>
    <div class="data_browser">
      <div class="showTit">底盘试验室-MOOG液压伺服试验系统 
        <!-- <img src="../assets/img/logo.png" class="logo" alt=""> -->
      </div>
      <div class="show-nav">
        <div class="back">
          <img src="../assets/img/fanhui.png" alt="" @click="GoBack">
        </div>
        <div class="name">Data Browser</div>
      </div>
      <div class="show-con">
        <div class="files">
          <div class="files-tit">Files</div>
          <div class="files-list">
            <ul>
              <li :class="SelectIndex === index ? 'active' : ''" v-for="(item,index) in fileNameList" :key="index" @click="selectFile(item,index)">{{item}}</li>
            </ul>
            <div class="bot-btn">
              <p>设备管理：</p>
              <p>负责人：马某</p>
            </div>
          </div>
        </div>
        <div class="border-b"></div>
        <div class="files-val">
          <div id="charts"></div>
          <div class="propertes">
            <div class="propertes_tit">Propertes</div>
            <div class="propertes_cont">
              <div class="cont_left">
                <div class="row">
                  <div class="cal">propety Name</div>
                  <div class="cal">value</div>
                </div>
                <div class="row">
                  <div class="cal">Size</div>
                  <div class="cal">{{ReadFileS.size}}</div>
                </div>
                <div class="row">
                  <div class="cal">Created Date</div>
                  <div class="cal">{{ReadFileS.create_date}}</div>
                </div>
                <div class="row">
                  <div class="cal">Modifed Date</div>
                  <div class="cal">{{ReadFileS.modifed_date}}</div>
                </div>
                <div class="row">
                  <div class="cal">Name</div>
                  <div class="cal">{{ReadFileS.name}}</div>
                </div>
              </div>
              <div class="cont_right">
                <div class="row">
                  <div class="cal">Owner</div>
                  <div class="cal">value</div>
                </div>
                <div class="row">
                  <div class="cal">Project</div>
                  <div class="cal">Test project</div>
                </div>
                <div class="row">
                  <div class="cal">Tags</div>
                  <div class="cal">value</div>
                </div>
                <div class="row">
                  <div class="cal">Type</div>
                  <div class="cal">{{ReadFileS.file_type}}</div>
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
        name: "dataBrowser",
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
                    color:'#BBBBBB'
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
                    color:'#BBBBBB'
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
          fileNameList:[],
          SelectIndex:-1,
          ReadFileS:{
            size: '',
            create_date: "",
            modifed_date: "",
            name: "",
            file_type:''
          }
        }
      },
      methods:{
        GoBack(){
          this.$router.go(-1)
        },
        selectFile(item,index){
          if(this.SelectIndex === index)return;
          this.SelectIndex = index;
          this.datawen = [];
          this.datashi = [];
          this.dataX = [];
          this.options.series[0].data = this.datawen;
          this.options.series[1].data = this.datashi;
          this.options.xAxis[0].data = this.dataX;
          // console.log(this.options)
          this.ReadFile(item);
          this.initWebSocket(item);
        },
        ReadFile(item){
          this.$axios({
            method: 'get',
            url: `http://www.kongfunion.club/read_file?file_name=${item}`,
            headers: {
              'Authorization':'token',
              'Accept':"application/json; charset=utd-8"
            }
          }).then(res => {
            // console.log(res.data)
            this.ReadFileS = res.data
          }).catch(error => {
          });
        },
        initWebSocket(name) {
          const wsuri = `ws://www.kongfunion.club/ws/project/${name}/`;
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
          var chart = this.$echarts.init(document.getElementById("charts"));
          let ObjData = JSON.parse(e.data);
          this.datawen.push(ObjData.text.force);
          this.datashi.push(ObjData.text.position);
          this.dataX.push(ObjData.text.time);
          // console.log(this.options)
          chart.setOption(this.options,true);

        },
        websocketclose() {  //关闭
          // console.log("WebSocket关闭");1

        },
        websocketerror() {  //失败
          //  console.log("WebSocket连接失败");
        },
      },
      mounted() {
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
                color: '#24DCE0' //改变折线颜色
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
          // areaStyle:{
          //   normal:{
          //     //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
          //     color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          //       offset: 0,
          //       color: 'rgba(80,141,255,0.39)'
          //     },{
          //       offset: 1,
          //       color: 'rgba(38,197,254,0.00)'
          //     }])
          //
          //   }
          // },//区域颜色渐变
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
              type : 'solid',
              color:'#0A1632'
            }
          },
        });



        this.$axios({
          method: 'get',
          url: 'http://www.kongfunion.club/file_name',
          headers: {
            'Authorization':'token',
            'Accept':"application/json; charset=utd-8"
          }
        }).then(res => {
          // console.log(res.data)
          this.fileNameList = res.data
        }).catch(error => {
        });

      },
      destroyed() {
        this.websock.close() //离开路由之后断开websocket连接
      },
    }
</script>

<style scoped lang="scss">
  .data_browser{
    width: 1366px;
    height: 768px;
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
      .files{
        width:394px;
        height:625px;
        background:rgba(255,254,248,1);
        border:1px solid rgba(109, 152, 214, 1);
        box-shadow:0px 11px 57px 0px rgba(36,44,64,0.4);
        float: left;
        .files-tit{
          width:394px;
          height:45px;
          background:rgba(119,145,235,1);
          font-size:18px;
          color:rgba(255,255,255,1);
          line-height:45px;
          text-indent: 35px;
        }
        .files-list{
          width: calc(100% - 12px);
          height: calc(100% - 62px);
          padding-top: 17px;
          padding-left: 12px;
          position: relative;
          ul{
            overflow: hidden;
            height: calc(100% - 50px);
            li{
              width: 50%;
              float: left;
              font-size:16px;
              color:rgba(51,51,51,1);
              line-height:36px;
              border-radius: 4px;
              cursor: pointer;
              &.active{
                background: #405FC8;
                color: #FFFFFF;
              }
            }
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
      }
      .border-b{
        width:1px;
        height:625px;
        background:#AEC4E6;
        float: left;
        margin-left: 17px;
      }
      .files-val{
        float: left;
        margin-left: 30px;
        height: 625px;
        #charts{
          width: 855px;
          height: calc(100% - 320px);
          margin-bottom: 20px;
        }
        .propertes{
          width:855px;
          height:299px;
          background:rgba(255,254,248,1);
          border:1px solid rgba(109, 152, 214, 1);
          box-shadow:0px 11px 57px 0px rgba(36,44,64,0.4);
          .propertes_tit{
            width:855px;
            height:45px;
            background:rgba(119,145,235,1);
            text-indent: 30px;
            font-size:18px;
            color:rgba(255,255,255,1);
            line-height:45px;
          }
          .propertes_cont{
            width: calc(100% - 24px);
            height: calc(100% - 55px);
            padding:10px 12px 0 12px ;
            >div{
              width: 50%;
              height: 100%;
              float: left;
              .row{
                width: 100%;
                overflow: hidden;
                .cal{
                  width: 50%;
                  float: left;
                  font-size:16px;
                  color:rgba(51,51,51,1);
                  line-height:42px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>

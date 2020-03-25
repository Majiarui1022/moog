<template>
    <div class="index-box">
      <div class="name-tit">NBD底盘试验室-MOOG液压伺服试验系统 <img src="../assets/img/logo.png" class="logo" alt=""></div>
      <div class="content">
        <div class="A-con" v-for="(item,index) in dataList" :key="index">
            <div class="left">
              <img src="../assets/img/tu.png" alt="">
              <p class="IP_name">IP:{{item.host}}</p>
            </div>
            <div class="right">
              <div class="A-ms" v-for="(val,inx) in item.station" :key="inx" @click="GoStail(item.host,val.name)">
                <div class="Status-B">
                  <img :src="val.value[0] === 'L' ? L : val.value[0] === 'F' ? F : val.value[0] === 'N' ? N : val.value[0] === 'H' ? H : ''" alt="">
                  <p v-html="val.value[0] === 'L' ? LN : val.value[0] === 'F' ? FN : val.value[0] === 'N' ? NN : val.value[0] === 'H' ? HN : ''"></p>
                </div>
                <div class="Sta-name">{{val.name}}</div>
              </div>
            </div>
          </div>
        <div class="name">
          <p>设备管理：资源保障处装备技术模块</p>
          <p>负责人：杨春辉</p>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "index",
      data(){
          return{
            dataList:[],
            F:require("../assets/img/safety.png"),
            N:require("../assets/img/station.png"),
            L:require("../assets/img/low.png"),
            H:require("../assets/img/high.png"),
            FN:'Safety limit<br>exceeded',
            NN:'Station<br>inactive',
            LN:'Low<br>perssure',
            HN:'High<br>pressure',
            name:'High<br> pressure'
          }
      },
      methods:{
        GoStail(ip,name){
          this.$router.push({
            name:'showData',
            query:{
              ip:ip,
              name:name
            }
          })
        },
        initWebSocket() {
          const wsuri = `ws://10.102.100.120:8003/project/controllers/`;
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
          this.dataList = ObjData.text
        },
        websocketclose() {  //关闭
          // console.log("WebSocket关闭");

        },
        websocketerror() {  //失败
          //  console.log("WebSocket连接失败");
        },

      },
      mounted() {
        this.initWebSocket()

      },
      destroyed() {
        this.websock.close() //离开路由之后断开websocket连接
      },

    }
</script>

<style scoped lang="scss">
  .index-box {
    width: 1366px;
    height: 768px;
    .name-tit {
      width: 1351px;
      height: 60px;
      background: #FFFFFF;
      padding-left:15px;
      font-size: 18px;
      color: #333333;
      line-height: 60px;
      position: relative;
      .logo{
        position: absolute;
        right:30px;
        top: 3px;
      }
    }

    .content {
      width: 1350px;
      height: 673px;
      background: #FFFFFF;
      padding-top: 35px;
      padding-left: 16px;
      background-image: url("../assets/img/bigBj.png");
      position: relative;
      >div{
        float: left;
        overflow: hidden;
        margin-right: 20px;
        .left{
          float: left;
          width:291px;
          height:620px;
          border:1px solid rgba(109, 152, 214, 1);
          box-shadow:0px 11px 57px 0px rgba(36,44,64,0.4);
          background: url("../assets/img/concurter.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          .IP_name{
            position: absolute;
            right: 17px;
            bottom: 30px;
            font-size:16px;
            color:rgba(22,41,81,1);
          }
          img{
            width:90%;
            height: 80%;
            display: block;
            margin: 10% auto 0;
          }
        }
        .right{
          float: left;
          margin-left: 8px;
          .A-ms{
            width: 100%;
            margin-bottom: 12px;
            overflow: hidden;
            cursor: pointer;
            .Status-B{
              width: 90px;
              height: 90px;
              float: left;
              box-shadow:0px 11px 57px 0px rgba(36,44,64,0.4);
              background: url("../assets/img/status.png") no-repeat;
              background-size: 100% 100%;
              img{
                display: block;
                margin: 0 auto;
                width: 56px;
              }
              p{
                font-size:12px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(18,61,168,1);
                line-height:12px;
                margin: 0;
                text-align: center;
              }
            }
            .Sta-name{
              float: left;
              width: 30px;
              height: 90px;
              box-shadow:0px 11px 57px 0px rgba(36,44,64,0.4);
              border-left: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              background: url("../assets/img/nameP.png") no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
      .name{
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
</style>
  }

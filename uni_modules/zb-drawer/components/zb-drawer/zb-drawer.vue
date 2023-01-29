<template>
  <view
      @touchmove.stop.prevent="()=>{}"
  <!-- #ifdef H5 -->
  v-show="show"
  <!-- #endif -->
  <!-- #ifndef H5 -->
  v-if="show"
  <!-- #endif -->
  class="zb-drawer__wrapper"

  >
  <view class="mask" :class="{'mask__visible':show&&mask&&modal}" @click.stop="close('mask')"></view>
  <view
      @touchstart="touchstart"
      @touchend="touchend"
      @touchmove="touchmove"
      @click.stop=""
      class="zb-drawer__container"
      :class="[`zb-drawer_${mode}`,{
          'animation':isMove,
          'content--visible':mask&&(mode==='left'||mode==='right'),
          'content--visible_Y':mask&&(mode==='top'||mode==='bottom'),
		  'content--visible_top':radius&&mode==='top',
		  'content--visible_bottom':radius&&mode==='bottom'
          }]"
      :style="[{
			top:(top>0||top)?top:false ,
            width:(mode==='left'||mode==='right')?getWidth:'100%',
            height:(mode==='top'||mode==='bottom')?height:'100%',
          },style]">
    <view class="zb_drawer__header" v-if="withHeader">
      <slot name="title">
        <view class="title">{{ title }}</view>
      </slot>

      <view class="close-wrap" v-if="showClose" @click="close('cancel')">
        <!-- #ifndef APP-NVUE||APP-PLUS-NVUE -->
        <view class="close"></view>
        <!-- #endif -->
        <!-- #ifdef APP-NVUE||APP-PLUS-NVUE -->
        <view class="close" v-if="showClose">
          <view class="before"></view>
          <view class="after"></view>
        </view>
        <!-- #endif -->
      </view>
    </view>
    <view class="zb_drawer__body">
      <slot></slot>
    </view>

  </view>
  </view>
</template>
<script >
export default {
  props:{
    withHeader:{
      type:Boolean,
      default:true
    },
    wrapperClosable:{
      type:Boolean,
      default:true
    },
    modal:{
      type:Boolean,
      default:true
    },
    radius:{
      type:Boolean,
      default:false
    },
    isGesture:{
      type:Boolean,
      default:false
    },
    beforeClose:Function,
    showClose:{
      type:Boolean,
      default:true
    },
    title:{
      type:String,
      default:'我是标题'
    },
    top:{
      type:[Number,String],
      default:0
    },
    visible: Boolean,
    width:{
      type:[Number,String],
      default:'50%'
    },
    height: {
      type:[Number,String],
      default:'30%'
    },
    isShowTabBar:{
      type:Boolean,
      default:false
    },
    mode:{
      type:String,
      default:'right'
    }
  },
  computed:{
    getWidth(){
      let wid = this.width
      // #ifdef APP-NVUE||APP-PLUS-NVUE
      try {
        const res = uni.getSystemInfoSync();
        if(this.width.indexOf('%')>-1){
          let percent = Number(this.width.replace('%',''))
          wid = res.screenWidth*percent/100
        }
      } catch (e) {
        // error
      }
      // #endif
      return wid
    }
  },
  watch:{
    show:{
      handler(newValue){
        this.$emit('update:visible', newValue)
      },

    },
    visible:{
      async handler(val){
        if(val){
          this._change('show','mask',val)
          this.getDrawerWidth()
        }else{
          this._change('mask','show',val)
        }
      },
      immediate:true
    }
  },
  data(){
    return{
      style:{

      },
      isMove:true,
      show: false,
      mask:this.visible,
      watchTimer:null,
      start:{
        x:null,
        y:null
      },
      move:{
        x:null,
        y:null
      },
      drawerWidth:0,
      drawerHeight:0,
      moveDisX:null,
      moveDisY:null,
    }
  },
  methods:{
    getDrawerWidth(){
      this.$nextTick(()=>{
        uni.createSelectorQuery().in(this).select('.zb-drawer__container').boundingClientRect(data=>{
          this.drawerWidth = data.width
          this.drawerHeight = data.height
        }).exec()
      })
    },
    getAngle(angx, angy){
      return Math.atan2(angy, angx) * 180 / Math.PI;
    },
    /* 获取滑动直线与水平线的夹角 */
    getLineAngle(x1, y1, x2, y2) {
      var x = x1 - x2,
          y = y1 - y2;
      if (!x && !y) {
        return 0;
      }
      var angle = (180 + Math.atan2(-y, -x) * 180 / Math.PI + 360) % 360;
      return 360 - angle;
    },

    getDirection(x1,y1,x2,y2){
      let angx = x2-x1
      let angy = y2-y1
      let result = 0;
      //如果滑动距离太短
      // if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
      //   return result;
      // }
      let angle = this.getAngle(angx, angy);
      // let lineAngle = this.getLineAngle(1,y1,x2,y2)
      if (angle >= -135 && angle <= -45) {
        return '下滑'
      } else if (angle > 45 && angle < 135) {
        return '上滑'
      } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        return '右滑'
      } else if (angle >= -45 && angle <= 45) {
        return '左滑'
      }
    },
    touchstart(e){
      this.isMove = false
      let [changedTouche] = e.changedTouches
      this.start.x = changedTouche.clientX
      this.start.y = changedTouche.clientY
    },
    touchend(e){
      this.isMove = true
      if(this.mode==='left'||this.mode==='right'){
        if(Math.abs(this.moveDisX)>this.drawerWidth/2){
          this._change('mask','show',false)
        }else {
          this.style={
            transform: `translateX(0px)`
          }
        }
      }
      if(this.mode==='top'||this.mode==='bottom'){
        if(Math.abs(this.moveDisY)>this.drawerHeight/2){
          this._change('mask','show',false)
        }else {
          this.style={
            transform: `translateY(0px)`
          }
        }
      }
      setTimeout(()=>{
        this.style = {}
        this.moveDisY = 0
        this.moveDisX = 0
      },100)
    },
    touchmove(e){
      if(!this.isGesture) return ;
      if(this.top&&this.mode==='top'){
        return
      }

      let [changedTouche] = e.changedTouches
      this.move.x = changedTouche.clientX
      this.move.y = changedTouche.clientY

      this.moveDisX = this.move.x - this.start.x
      this.moveDisY = this.move.y - this.start.y

      let direction = this.getDirection(this.move.x,this.move.y,this.start.x,this.start.y,)
      if(direction==='左滑'&&this.mode==='left'){
          this.style = {
            transform: `translateX(${this.moveDisX}px)`
          }
      }else if(direction==='右滑'&&this.mode==='right'){
        this.style = {
          transform: `translateX(${this.moveDisX}px)`
        }
      }else if(direction==='上滑'&&this.mode==='top'){
        this.style = {
          transform: `translateY(${this.moveDisY}px)`
        }
      }else if(direction==='下滑'&&this.mode==='bottom'){
        this.style = {
          transform: `translateY(${this.moveDisY}px)`
        }
      }
    },
    _change(param1, param2, status) {
      this[param1] = status
      this.watchTimer&&clearTimeout(this.watchTimer)
      this.watchTimer = setTimeout(() => {
        this[param2] = status
        this.$emit('change',status)
      }, status ? 50 : 300)
    },
    close(type){
      if(this.beforeClose&&typeof this.beforeClose==='function'){
        return this.beforeClose(()=>{
          this._change('mask','show',false)
        },type)
      }

      if(this.wrapperClosable&&type==='mask'){
        this._change('mask','show',false)
      }
      if(type==='cancel'){
        this._change('mask','show',false)
      }
      this.$emit('closeDrawer')

    }
  }
}
</script>

<style lang="scss" scoped>
.zb-drawer__wrapper{
  //display: block;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  //bottom: calc(var(--window-bottom) + 20px);
  left: 0;
  overflow: hidden;
  margin: 0;
  z-index: 999;
}
.content--visible_top{
  border-bottom-left-radius: 8rpx;
  border-bottom-right-radius: 8rpx;
}
.content--visible_bottom{
  border-top-left-radius: 8rpx;
  border-top-right-radius: 8rpx;
}
.mask{
  //display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.4);
  transition: opacity 0.3s;
}
.mask__visible {
  ///* #ifndef APP-NVUE */
  //display: block;
  ///* #endif */
  opacity: 1;
}
.zb-drawer__body{
  padding: 10rpx 20rpx 0rpx;
}
.zb_drawer__header{
  display: flex;
  align-items: center;
  padding: 20rpx 28rpx;
  flex-direction: row;
  .title{
    flex: 1;
  }
  .close-wrap{
    position: relative;
    /* #ifndef APP-NVUE || APP-PLUS-NVUE */
    flex-shrink: 0;
    /* #endif */
    overflow: hidden;
  }
  .close {
    width: 50rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    height:  50rpx;
    /* #ifndef APP-NVUE || APP-PLUS-NVUE */
    cursor: pointer;
    /* #endif */
  }
  .before, .after {
    position: absolute;
    left: 30rpx;
    /* #ifndef APP-NVUE || APP-PLUS-NVUE */
    content: ' ';
    /* #endif */
    height: 30rpx;
    width: 4rpx;
    background-color: #333;
  }

  .close:before, .close:after {
    /* #ifndef APP-NVUE || APP-PLUS-NVUE */
    position: absolute;
    left: 30rpx;
    content: ' ';
    height: 30rpx;
    width: 4rpx;
    background-color: #333;
    /* #endif */
  }

  .before {
    transform: rotate(45deg);
  }
  .after {
    transform: rotate(-45deg);
  }
  .close:before {
    transform: rotate(45deg);
  }
  .close:after {
    transform: rotate(-45deg);
  }
}

.zb-drawer__container{
  /* #ifndef APP-NVUE || APP-PLUS-NVUE */
  outline: 0;
  /* #endif */
  height: 100%;
  position: absolute;
  width: 200px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}
.animation{
  transition: transform 0.3s ease;
}
.zb-drawer_top{
  top: 0;
  right:0;
  left: 0;
  transform: translateY(-100%);
}
.zb-drawer_bottom{
  bottom: 0;
  right: 0;
  left: 0;
  transform: translateY(100%);
}
.zb-drawer_right{
  right: 0;
  top:0;
  bottom: 0;
  transform: translateX(100%);
}
.zb-drawer_left{
  top:0;
  left: 0;
  bottom: 0;
  transform: translateX(-100%);
}
.content--visible{
  transform: translateX(0px);
}
.content--visible_Y{
  transform: translateY(0px);
}
.zb_drawer__body{
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>

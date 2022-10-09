<script setup>
import { ref, onMounted } from 'vue';
import music from './assets/1.mp3';
import images from './image';
import data from './map.js';
import { changeMapClick, generateMap } from './utils';

const count = ref(data.count);
// 地图
const map = ref(changeMapClick(data.map));
// 选择的卡牌列表
const list = ref([]);
const musicRef = ref(null);
// 已经被选了的牌
let countSelected = 0;
// 游戏状态
const gameState = ref('notStart');

const start = ({ dynamic = false}) => {
  musicRef.value.play();
  gameState.value = 'pending';
  list.value = [];
  countSelected = 0;
  if (dynamic) {
    const newData = generateMap();
    console.log("🚀 ~ file: App.vue ~ line 26 ~ start ~ newData", newData)
    map.value = changeMapClick(newData.map);
    count.value = newData.count;
  } else {
    map.value = changeMapClick(data.map);
    count.value = data.count;
  }
}

const clickCard = (lattice) => {
  if (lattice.click && gameState.value ==='pending') {
    countSelected++;
    map.value = changeMapClick(map.value.filter(item => item.id !== lattice.id));
    // 需要放进被选择框的列表
    const index = list.value.findIndex(item => item.type === lattice.type)
    if (index === -1) {
      list.value.push(lattice);
    } else {
      list.value.splice(index, 0, lattice);
    }
    
    setTimeout(() => {
      // 判断能不能消除
      for (let i = 0; i < list.value.length - 2; i++) {
        // 可以消除
        if (list.value[i + 2].type === list.value[i].type) {
          list.value.splice(i, 3);
        }
      }
      // 判断length是否为7
      if (list.value.length === 7) {
        gameState.value = 'fail';
      }
      if (countSelected === count.value) {
        if (countSelected === data.count) {
          start({dynamic: true})
        } else {
          gameState.value = 'success';
        }
      }
    }, 300)
  }
}

</script>

<template>
  <!--map-->
  <!--容器 container-->
  <div class="bg">
    <audio :src="music" loop="loop" ref="musicRef"></audio>
    <div class="container">
      <template v-for="lattice in map">
        <div 
          :key="lattice.id"
          v-if="lattice.type !== -1" 
          :class="lattice.click ? 'lattice' : 'lattice gray' " 
          :style="`top: ${lattice.top}vw; left: ${lattice.left}vw; z-index: ${lattice.zIndex}`" 
          @click="() => clickCard(lattice)">
          <img :src="images[lattice.type]" class="lattice-img" />
        </div>
      </template>
    </div>
    <div class="drawer">
      <div v-for="lattice in list" :key="lattice.id" class="lattice drawer-lattice">
        <img :src="images[lattice.type]" class="lattice-img" />
      </div>
    </div>
    <div class="game" v-if="gameState !== 'pending'">
      <div class="text" v-if="gameState === 'success'">恭喜过关</div>
      <div class="text" v-if="gameState === 'fail'">挑战失败</div>
      <div class="button" @click="start">{{gameState === 'notStart' ? '开始游戏' : '再玩一次'}}</div>
    </div>
  </div>
</template>

<style scoped>
  .bg {
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/images/bg.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    overflow: hidden;
  }
  .container {
    position: relative;
    margin: 20vh auto 0;
    width: 87.5vw;
    height: 87.5vw;
  }
  .lattice {
		position: absolute;
		width: 10.2vw;
		height: 10.2vw;
		padding: 1vw;
		border: 0.15vw solid black;
		border-radius: 20%;
		background-color: white;
	}
  .drawer-lattice {
    position: static;
  } 
  .gray {
    filter: grayscale(100%);
  }
	.lattice-img {
		width: 10.2vw;
		height: 10.2vw;
	}
  .drawer {
    height: 12.5vw;
    width: 87.5vw;
    padding: 1vw;
    border: 0.5vw solid black;
    border-radius: 5vw;
    /* background: white; */
    margin: 10vh auto;
    background-image: url('@/assets/images/dian.png');
    background-size: 12.5vw 12.5vw;
    background-position: center;
    display: flex;
  }
  .text {
    padding: 2vw 0 10vw;
    text-align: center;
    font-size: 20px;
  }
  .game {
    position: fixed;
    width: 50vw;
    top: 30vh;
    left: 20vw;
    background: white;
    z-index: 9999;
    padding: 5vw;
    border: 1px solid black;
    border-radius: 10px;
  }
  .button {
    width: 50vw;
    height: 15vw;
    font-size: 20px;
    text-align: center;
    line-height: 15vw;
    border: 1px solid black;
    border-radius: 10px;
  }
</style>

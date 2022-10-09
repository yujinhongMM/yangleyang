import { WIDTH } from './config';

// 计算当前map可拾取的状态
export const changeMapClick = (originMap) => {
    const map = [...originMap];
    const length = map.length;
    // 全部变成true
    for (let i = 0; i < length; i++) {
        map[i].click = true;
    }
    // 修改不可点击的状态
    // 全部变成true
    for (let i = 0; i < length; i++) {
        const left = map[i].left;
        const top = map[i].top;
        for (let j = 0; j < length; j++) {
            if (map[i].zIndex > map[j].zIndex) {
                // 判断j在不在i的范围内
                const jTop = map[j].top, jLeft = map[j].left;
                // 判断左上角
                const LT = jTop > top && jTop < top + WIDTH && jLeft > left && jLeft < left + WIDTH;
                // 判断右上角
                const RT = jTop > top && jTop < top + WIDTH && jLeft + WIDTH > left && jLeft + WIDTH < left + WIDTH;
                // 判断左下角
                const LB = jTop + WIDTH > top && jTop + WIDTH < top + WIDTH && jLeft > left && jLeft < left + WIDTH;
                // 判断右下角
                const RB = jTop + WIDTH > top && jTop + WIDTH < top + WIDTH && jLeft + WIDTH > left && jLeft + WIDTH < left + WIDTH;
                // 边界重合情况
                const boundary = 
                    (top === jTop && jLeft >= left && jLeft < left + WIDTH) ||
                    (top === jTop && jLeft <= left && jLeft + WIDTH > left) ||
                    (left === jLeft && jTop >= top && jTop < top + WIDTH) ||
                    (left === jLeft && jTop <= top && jTop + WIDTH > top)
                if (LT || RT || LB || RB || boundary) {
                    map[j].click = false;
                    continue;
                }
            }
        }
    }
    return map;
}
   

export const generateMap = () => {
    const mapList = [];
    const map = new Map([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]])
    let id = 0;
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            const type = Math.floor(Math.random()*6);
            map.set(type, map.get(type) + 1)
            id++;
            const obj = {
                id,
                type,
                top: WIDTH * i,
                left: WIDTH * j,
                click: false,
                zIndex: 1,
            }
            mapList.push(obj);
        }
    }
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            const type = Math.floor(Math.random()*6);
            map.set(type, map.get(type) + 1)
            id++;
            const obj = {
                id,
                type,
                top: WIDTH * i + WIDTH / 2,
                left: WIDTH * j + WIDTH / 2,
                click: false,
                zIndex: 2,
            }
            mapList.push(obj);
        }
    }
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const type = Math.floor(Math.random()*6);
            map.set(type, map.get(type) + 1)
            id++;
            const obj = {
                id,
                type,
                top: WIDTH * i + WIDTH,
                left: WIDTH * j + WIDTH,
                click: false,
                zIndex: 3,
            }
            mapList.push(obj);
        }
    }
    // 遍历map
    for (let [key, value] of map) {
        const remainder = 3 - value % 3;
        if (remainder !== 3) {
            for (let j = 0; j < remainder; j++) {
                id++;
                const random_1 = Math.floor(Math.random() * 75);
                const random_2 = Math.floor(Math.random() * 75);
                const obj = {
                    id,
                    type: key,
                    top: random_1 % WIDTH < 3 ? random_1 + 4 : random_1,
                    left: random_2 % WIDTH < 3 ? random_2 + 4 : random_2,
                    click: false,
                    zIndex: id,
                }
                mapList.push(obj);
            }
        }
    }
    
    return mapList;
}

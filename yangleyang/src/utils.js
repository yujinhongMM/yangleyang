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
                if (jTop >= top && jTop <= top + 12.5 && jLeft >= left && jLeft <= left + 12.5) {
                    map[j].click = false;
                    continue;
                }
                // 判断右上角
                if (jTop >= top && jTop <= top + 12.5 && jLeft + 12.5 >= left && jLeft + 12.5 <= left + 12.5) {
                    map[j].click = false;
                    continue;
                }
                // 判断左下角
                if (jTop + 12.5 >= top && jTop + 12.5 <= top + 12.5 && jLeft >= left && jLeft <= left + 12.5) {
                    map[j].click = false;
                    continue;
                }
                // 判断右下角
                if (jTop + 12.5 >= top && jTop + 12.5 <= top + 12.5 && jLeft + 12.5 >= left && jLeft + 12.5 <= left + 12.5) {
                    map[j].click = false;
                    continue;
                }
            }
        }
    }
    return map;
}
   

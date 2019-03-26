// 动效方案

/**
 * collapse(current = 0, previous  = 0, active = 0)
 * 
 * 手风琴效果
 * current    当前点击的列表项目ID，默认为 0    
 * previous   上一次点击的列表项目ID，默认为 0
 * active     点击后展开的列表项目ID，默认为 0
 */
function collapse(current = 0, previous  = 0, active = 0)
{
  if(current == previous) {
    previous = '';
    active = 0;
  } else {
    previous = current;
    active = current;
  }
  return {
    previous: previous,
    active: active
  }
}


/**
 * checkToMove(selected = 0, array = [])
 * 
 * 选中即从列表移除
 * selected  被选中的数组索引
 * array     被选中项所在数组
 */
function checkToMove(selected = 0, array = [])
{
  array.splice(selected, 1);
  return array;
}

module.exports = {
  collapse: collapse,
  checkToMove: checkToMove
}
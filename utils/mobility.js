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

module.exports = {
  collapse: collapse
}
export const HOOKS = [
  "beforeCreate",
  "created",
  "beforeMount",
  "mounted",
  "beforeUpdate",
  "updated",
  "beforeDestory",
  "destoryed",
]

// 策略模式
const starts = {}
starts.data = function (parentVal, childVal) {
  return childVal
}
// starts.computed = function () {}
// starts.watch = function () {}
// starts.methods = function () {}

starts.components = function (parentVal, childVal) {
  const obj = Object.create(parentVal);
  if(childVal) {
    for (const key in childVal) {
      obj[key] = childVal[key]
    }
  }
  return obj
}

// 遍曆生命周期
HOOKS.forEach(hooks => {
  starts[hooks] = mergeHooks
})

function mergeHooks(parentVal, childVal) {
  if(childVal) {
    if(parentVal) {
      return parentVal.concat(childVal)
    }

    return [childVal]
  }

  return parentVal
}

export function mergeOptions(parent, child) {
  const options = {};
  for (const key in parent) {
    mergeField(key)
  }
  for (const key in child) {
    mergeField(key)
  }

  function mergeField(key) {
    // 根據 key  策略模式
    if(starts[key]) {
      options[key] = starts[key](parent[key], child[key])
    } else {
      options[key] = child[key] || parent[key]
    }
  }
  // console.log(options)
  return options
}

export function toArray(list, start) { 
  start = start || 0
  let i = list.length - start
  const ret = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}
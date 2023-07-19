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
starts.computed = function () {}
starts.watch = function () {}
starts.methods = function () {}

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
      options[key]  = starts[key](parent[key], child[key])
    } else {
      options[key]  = child[key]
    }
  }
  // console.log(options)
  return options
}
type MessageType = "image" | "audio" | string;
type Message = {
  id: number;
  type: MessageType;
  sendemessage: string;
}

// Error：不能将类型“{ id: number; name: string; }”分配给类型“Message”。
// 对象字面量只能指定已知属性，并且“name”不在类型“Message”中。
// let msgobj:Message = {id:23, name:'sdsd'}

// let message: Array<Message> = [
let message: Message[] = [
  {
    id: 1, type: 'image', sendemessage:'DSfsdfsd',
  },
  {
    id: 2, type: 'audio', sendemessage:'DS fsdfse rwed',
  },
  {
    id: 3, type: 'audio', sendemessage:'DSfxc sdf vxcvsdf sd',
  },
  {
    id: 4, type: 'image', sendemessage:'DSfsdsdfsdf sdcxv fsd',
  },
  {
    id: 5, type: 'image', sendemessage:'DSsdas sdf sdfsdfsd',
  },
]

// 不用函数重载
// 函数结构不分明，可读性、可维护性变差
function getMessage(value: number | MessageType): Message | undefined | Array<Message> {
  if(typeof value === "number") {
    // return message.find((msa) => {
    //   return value === msa.id
    // })    
    return message.find((msa) => value === msa.id)
  } else {
    return message.filter((msa) => value === msa.type)
  }
}

console.log(getMessage(1))
// // TS 没有办法在运行前根据传递的值来推到方法最终返回的数据的数据类型
// // 只可以根据方法定义的类型展现
// // let msg = getMessage(1);
// // Error: 类型“Message | Message[]”上不存在属性“sendemessage”。
// // 类型“Message[]”上不存在属性“sendemessage”。
// // console.log(msg.sendemessage)

// // 可转换成类型的一种
// let msg = (<Message>getMessage(1));
// console.log(msg.sendemessage)

// 函数重载
/**
 * 函数签名[function sinature]: 函数签名 = 函数名称 + 函数参数 + 函数参数类型 + 返回值类型四者合成。在TS函数重载中，包含了实现签名和重载签名，实现签名是一种函数签名，重载也是一种函数签名。
 * 
 * 不完整模糊的 TS 函数重载定义： 一组具有相同名字，不同参数列表的和返回值无关的函数。
 * 
 * 完整的函数重载定义：包含了一下规则的一组函数就是 TS 函数重载
 * 1. 有一个实现签名 + 一个或多个重载签名
 * 2. 外部调用函数重载定义的函数时，只能调用重载签名，不能调用实现签名
 *    实现签名下的函数体是给重载签名编写的，实现签名只是在定义时起到了统领所有重载签名的作用，在执行调用时就看不到实现签名了
 * 3. 调用重载签名的函数时，会根据传递的参数来判断你调用的是哪一个函数
 * 4. 只有一个函数体，只有实现签名配备了函数体，所有的重载签名都只有签名，没有配备函数体
 * 5. 关于参数类型规则完整总结如下：
 *    无论重载函数有几个参数，参数类型是何种类型，实现签名都可以是一个无参函数签名；实现签名参数个数可以少于重载签名的参数个数，但实现签名如果准备包含重载签名的某个位置的参数，那实现签名就必须兼容所有重载签名该位置的参数类型【联合类型或 any 或unknown 类型的一种】。
 * 6. 关于重载签名和实现签名的返回值类型规则完整总结如下
 *    必须给重载签名提供返回值类型，TS无法默认推到
 *    提供给重载签名的返回值类型不一定为其执行时的真实返回值类型，可以为重载签名提供真实返回值类型，也可以提供 void 或值 unknown 或 any 类型，如果重载签名的返回值类型是 void 或值 unknown 或 any 类型，那么将由实现签名来决定重载签名执行的真实返回值类型。当然为了调用时有 自动提示 + 可读性更好 + 避免出现类型强制转换，强烈建议为重载签名提供真实返回值类型。
 *    不管重载签名返回值类型是何种类型【包括泛型类型】，实现签名都可以返回 any 类型或 unknown 类型，当然变我们两者都不选择，让TS 默认为实现签名自动推导返回值类型。
 * 
 */ 

// Error： 此重载签名与其实现签名不兼容。
// function getMessage1(id: number): Message 
function getMessage1(id: number): Message // 重载签名 可以有多个
function getMessage1(msgType: MessageType, readRecordCount: number): Message[]  // 重载签名
// 实现签名函数 只有实现签名函数有函数体，实现签名只能有一个
function getMessage1(payload_frompage: any, readRecordCount: number = 1): Message[] | Message | undefined {
  if(typeof payload_frompage === "number") {
    return message.find((msa) => payload_frompage === msa.id)
  } else {
    return message.filter((msa) => payload_frompage === msa.type).splice(0,readRecordCount)
  }
}

console.log(getMessage1(1))

export {  }
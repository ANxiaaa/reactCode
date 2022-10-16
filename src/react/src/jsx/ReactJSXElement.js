import hasOwnProperty from "shared/hasOwnProperty";
import { REACT_ELEMENT_TYPE } from "shared/ReactSymbols";

// 保留的属性 (不会放到props上)
const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
};

function hasValidKey(config) {
  return config.key !== undefined;
}
function hasValidRef(config) {
  return config.ref !== undefined;
}

function ReactElement(type, key, ref, props) {
  return {
    // 这就是React元素, 也就是虚拟DOM
    $$typeof: REACT_ELEMENT_TYPE,
    type, // h1 / span
    key, // 唯一标识
    ref, // 用来获取真实DOM元素的
    props, // 属性 children / style .....
  };
}

/**
 * 
 * @param {*} type 标签名
 * @param {*} config 标签属性
 * @returns 虚拟dom
 */
export function jsxDEV(type, config) {
  // let propName; // 属性名
  const props = {}; // 属性对象
  let key = null; // 每个虚拟dom都有一个可选的key, 用于区分父节点下不同的子节点
  let ref = null; // 引入, 后面可以通过这个实现获取DOM
  // 判定是否是合法的key和ref
  if (hasValidKey(config)) {
    key = config.key;
  }
  if (hasValidRef(config)) {
    ref = config.ref;
  }
  for (const propName in config) {
    // 是传过来的属性并且不在保留属性里, 就赋值
    if (
      hasOwnProperty.call(config, propName) &&
      !RESERVED_PROPS.hasOwnProperty(propName)
    ) {
      props[propName] = config[propName];
    }
  }
  return ReactElement(type, key, ref, props);
}

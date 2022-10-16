import { HostRoot } from "./ReactWorkTags";

/**
 * 本来此文件要处理更新优先级问题
 * 目前现在值实现向上冒泡找到根节点
 * @param {*} sourceFiber
 */
export function markUpdateLaneFromFiberToRoot(sourceFiber) {
  // 当前fiber
  let node = sourceFiber;
  // 父fiber
  let parent = sourceFiber.return;
  while (parent !== null) {
    // 如果有父fiber
    node = parent;
    parent = parent.return;
  }
  // 一直找到parent为null
  if (node.tag === HostRoot) {
    return node.stateNode;
  }
  return null;
}

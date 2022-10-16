// 工作标签
import { HostRoot } from "./ReactWorkTags";
// 副作用标识
import { NoFlags } from "./ReactFiberFlags";
/**
 *
 * @param {*} tag fiber类型 (函数组件0, 类组件1, 原生组件5, 根元素3)
 * @param {*} pendingProps 等待处理的属性
 * @param {*} key 唯一标识
 */
export function FiberNode(tag, pendingProps, key) {
  this.tag = tag;
  this.key = key;
  this.type = null; // fiber类型, 来自于虚拟DOM节点的type   (span h1 p)
  this.stateNode = null; // 此fiber对应的真实DOM节点

  this.return = null; // 指向父节点
  this.child = null; // 指向第一个子节点
  this.sibling = null; // 指向弟弟

  // 虚拟DOM会提供pendingProps给创建fiber的属性，等处理完复制给memoizedProps
  this.pendingProps = pendingProps; // 等待生效的属性
  this.memoizedProps = null; // 已经生效的属性

  // 每个fiber还会有自己的状态，每一种fiber状态存的类型都不一样
  // 类组件对应的fiber存的就是实例的状态，HostRoot存的就是要渲染的元素
  this.memoizedState = null;

  // 每个fiber可能还有自己的更新队列
  this.updateQueue = null;

  this.flags = NoFlags; // 副作用标识，表示对此fiber节点进行何种操作
  this.subtreeFlags = NoFlags; // 子节点对应的副作用标识
  this.alternate = null; // 轮替 (缓存了另一个fiber节点实例) diff时用
}
// 创建Fiber
export function createFiber(tag, pendingProps, key) {
  // fiber节点
  return new FiberNode(tag, pendingProps, key);
}
export function createHostRootFiber() {
  // 创建一个fiber节点
  return createFiber(HostRoot, null, null);
}

/**
 * 根据老fiber和新的属性创建新的fiber
 * @param {*} current 老fiber
 * @param {*} pendingProps 新的属性
 */
export function creatWorkInProgress(current, pendingProps) {
  // 拿到老fiber的轮替 第一次没有
  let workInProgress = current.alternate;
  if (workInProgress === null) {
    // 创建一个新的fiber
    workInProgress = createFiber(current.tag, pendingProps, current.key);
    workInProgress.type = current.type;
    workInProgress.stateNode = current.stateNode;
    // 双向指针 互相轮替
    workInProgress.alternate = current;
    current.alternate = workInProgress;
  } else {
    // 更新
    workInProgress.pendingProps = current.pendingProps;
    workInProgress.type = current.type;
    // 清空副作用标识
    workInProgress.flags = NoFlags;
    workInProgress.subtreeFlags = NoFlags;
    // 更新就不用双向指针了
  }
  // 复制属性
  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.updateQueue = current.updateQueue;
  workInProgress.sibling = current.sibling;
  workInProgress.index = current.index
  return workInProgress
}

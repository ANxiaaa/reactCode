import { HostComponent, HostRoot, HostText } from "./ReactWorkTags";
import { processUpdateQueue } from "./ReactFiberClassUpdateQueue";
import { mountChildFibers, reconcileChildFibers } from "./ReactChildFiber";
function updateHostRoot(current, workInProgress) {
  // 需要知道它的子虚拟dom, 知道它的儿子的虚拟dom信息
  // 之前在根fiber的更新队列加的虚拟dom, 可以在这获取
  processUpdateQueue(workInProgress); // workInProgress.memoizedState = { element }
  const nextState = workInProgress.memoizedState;
  // 拿到虚拟dom
  const nextChildren = nextState.element;
  // 协调子节点 (DOM-DIFF)
  reconcileChildren(current, workInProgress, nextChildren);
  // 返回子节点
  return workInProgress.child; // { tag: 5, type: 'h1' }
}

function updateHostComponents(current, workInProgress) {}

/**
 * 根据 `新的` 虚拟dom去构建  `新的` fiber链表
 * @param {*} current 老fiber
 * @param {*} workInProgress 新fiber
 * @returns 下一个工作单元
 */
export function beginWork(current, workInProgress) {
  console.log("beginWork", workInProgress);
  // 判断类型
  switch (workInProgress.tag) {
    case HostRoot:
      return updateHostRoot(current, workInProgress);

    case HostComponent:
      return updateHostComponents(current, workInProgress);

    // 纯文本没有子节点
    case HostText:
      return null;

    default:
      return null;
  }
}

/**
 * 根据新的虚拟dom生成新的fiber链表
 * @param {*} current 老的父fiber
 * @param {*} workInProgress 新的父fiber
 * @param {*} nextChildren 新的子虚拟dom
 */
function reconcileChildren(current, workInProgress, nextChildren) {
  // 如果此新fiber没有老fiber, 说明是新创建的
  if (current === null) {
    // 挂在子fiber
    workInProgress.child = mountChildFibers(workInProgress, null, next);
  } else {
    // 更新:  协调子fiber列表 需要做DOM-DIFF   (初始化时的根fiber是有老fiber的(一开始创建的))
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren
    );
  }
}

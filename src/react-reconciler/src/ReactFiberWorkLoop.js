import { scheduleCallback } from "scheduler";
import { creatWorkInProgress } from "./ReactFiber";
import { beginWork } from "./ReactFiberBeginWork";
// 正在进行中的工作
let workInProgress = null;

/**
 * 计划更新root
 * @param {*} root
 */
export function scheduleUpdateOnFiber(root) {
  // 确保调度执行root上的更新
  ensureRootIsScheduled(root);
}

function ensureRootIsScheduled(root) {
  // 告诉浏览器要执行performConcurrentWorkOnRoot 参数定死为root
  scheduleCallback(performConcurrentWorkOnRoot.bind(null, root));
}

/**
 * 根据当前的fiber节点构建fiber树, 创建真实的dom节点, 插入到容器
 * @param {*} root
 */
function performConcurrentWorkOnRoot(root) {
  // 初次渲染的时候以同步方式渲染根节点, 因为要尽快展示
  renderRootSync(root);
}

function prepareFreshStack(root) {
  workInProgress = creatWorkInProgress(root.current);
}

function renderRootSync(root) {
  // 先构建了一个空的栈
  prepareFreshStack(root);
  workLoopSync();
}

// 工作同步循环
function workLoopSync() {
  while (workInProgress !== null) {
    // 执行工作单元
    performUnitOfWork(workInProgress);
  }
}

function performUnitOfWork(unitOfWork) {
  // 通过新fiber获取老fiber
  const current = unitOfWork.alternate;
  // 开始工作, 完成当前fiber的子fiber链表构建后
  const next = beginWork(current, unitOfWork);
  // 把等待生效的属性变成已经生效的
  unitOfWork.memoizeProps = unitOfWork.pendingProps;
  if (next === null) {
    // 说明已经完成
    // 完成工作单元
    // completeUnitOfWork();
    workInProgress = null;
  } else {
    // 如果有子节点就成为下一个工作单元
    workInProgress = next;
  }
}

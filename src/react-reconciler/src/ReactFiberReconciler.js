import { createFiberRoot } from "./ReactFiberRoot";
import { createUpdate, enqueueUpdate } from "./ReactFiberClassUpdateQueue";
import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";
// 创建容器 containerInfo: 容器信息
export function createContainer(containerInfo) {
  // 2. 容器需要一个根节点
  return createFiberRoot(containerInfo);
}

/**
 * 更新容器, 把虚拟DOM变成真实DOM 插入到container容器中
 * @param {*} element 虚拟DOM
 * @param {*} container 容器   FiberRootNode
 */
export function updateContainer(element, container) {
  // 根Fiber
  const current = container.current;
  // 创建更新
  const update = createUpdate();
  // 需要更新的虚拟DOM
  update.payload = {
    element,
  };
  // 把此更新对象添加到current这个根Fiber的更新队列上
  let root = enqueueUpdate(current, update);
  // 调度更新
  scheduleUpdateOnFiber(root);
}

import { createHostRootFiber } from "./ReactFiber";
import { initialUpdateQueue } from "./ReactFiberClassUpdateQueue";

function FiberRootNode(containerInfo) {
  this.containerInfo = containerInfo;
}
export function createFiberRoot(containerInfo) {
  const root = new FiberRootNode(containerInfo);
  // 1. 创建根fiber. hostRoot就是根节点dev#root
  // 未初始化的fiber
  const uninitializedFiber = createHostRootFiber();
  // 当前渲染页面的fiber树.
  // 根容器的current指向当前的根fiber
  root.current = uninitializedFiber;
  // 这个fiber变的节点就是dom容器
  uninitializedFiber.stateNode = root;
  initialUpdateQueue(uninitializedFiber);
  return root;
}

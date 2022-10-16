import {
  createContainer,
  updateContainer,
} from "react-reconciler/src/ReactFiberReconciler";
function ReactDOMRoot(internalRoot) {
  this._internalRoot = internalRoot;
}
ReactDOMRoot.prototype.render = function (children) {
  const root = this._internalRoot;
  console.log(root, 'image.png');
  // 1. 更新容器
  updateContainer(children, root);
};
export function createRoot(container) {
  const root = createContainer(container);
  console.log(root);
  return new ReactDOMRoot(root);
}

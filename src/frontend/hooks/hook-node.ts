export interface HookNode<TState, TActions> {
  actions: TActions;
  state: TState;
}

export interface ParentHookNode<TState, TActions, TChildrenNodes>
  extends HookNode<TState, TActions> {
  childrenNodes: TChildrenNodes;
}

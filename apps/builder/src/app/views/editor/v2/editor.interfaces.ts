export interface Block {
  groupId?: string;
  id: string;
  content?: object;
  items?: { id: string; content: any; type: number }[];
  options?: object;
  type: string;
}

export interface GroupStructuredBlock {
  id: string;
  name: string;
  blocks: Block[];
}

export interface GroupBlock {
  id: string;
  name: string;
  position: { x: number; y: number };
  draggable: boolean;
  popover?: boolean;
  blocks: Block[];
}

export interface Endpoint {
  identifier: string;
  instance: any;
}

export interface Edge {
  id: string;
  from: { blockId: string; groupId?: string };
  to: { groupId: string };
}

export interface TypeBot {
  name: string;
  groups: GroupBlock[];
  edges: Edge[];
}

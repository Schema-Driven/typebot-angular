export interface Block {
  groupId?: string;
  id: string;
  content?: object;
  items?: { id: string, content: any, type: number }[];
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
  position: {x: number, y: number};
  draggable: boolean;
  blocks: Block[];
}

export interface Endpoint {
  identifier: string;
  instance: any;
}

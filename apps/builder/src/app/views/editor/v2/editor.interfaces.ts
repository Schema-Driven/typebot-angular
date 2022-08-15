export interface Block {
  id: string;
  content?: object;
  items?: { id: string, content: any, type: number }[];
  options?: object;
  type: string;
}

export interface GroupStructuredBlock {
  uuid: string;
  name: string;
  blocks: Block[];
}

export interface GroupBlock {
  id: number;
  uuid: string;
  name: string;
  position: any;
  draggable: boolean;
  blocks: Block[];
}

export interface Endpoint {
  identifier: string;
  instance: any;
}

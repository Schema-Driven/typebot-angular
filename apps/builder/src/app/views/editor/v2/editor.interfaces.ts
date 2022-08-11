export interface Block {
  id: number;
  uuid: string;
  name?: string;
  position?: any;
  svg?: string;
  rendered?: boolean;
  endpoint?: any;
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

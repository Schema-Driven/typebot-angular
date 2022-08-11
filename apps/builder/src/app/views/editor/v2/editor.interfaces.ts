export interface Block {
  id: number;
  uuid: string;
  name?: string;
  position?: any;
  svg?: string;
}

export interface GroupStructuredBlock {
  uuid: string;
  name: string;
  blocks: Block[];
}

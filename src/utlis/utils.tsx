export interface InputFormProps {
  isStatus: boolean;
  setItemData: React.Dispatch<
    React.SetStateAction<Array<{ name: string; desc: string; status: boolean }>>
  >;
}

export interface ItemProps {
  name: string;
  desc: string;
  status: boolean;
}

export interface TableProps {
  setIsStatus: React.Dispatch<React.SetStateAction<boolean>>;
  itemData: ItemProps[];
  setItemData: React.Dispatch<
    React.SetStateAction<Array<{ name: string; desc: string; status: boolean }>>
  >;
}

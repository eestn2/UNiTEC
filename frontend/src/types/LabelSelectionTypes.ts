// types.ts
export type BlockType = "Etiquetas" | "Idiomas";

export interface SelectedItem {
  id: number;
  name: string;
  block: BlockType;
  level: number;
}

export interface OptionItem {
  id: number;
  name: string;
}

export interface Bloque {
  titulo: BlockType;
  etiquetas: string[];
  placeholder: string;
}
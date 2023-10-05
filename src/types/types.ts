export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};
// Local'e Gönderilecek typelar

export type RawNote ={
    id:string;
} & RawNoteData


export type RawNoteData = {
    title: string;
    markdown: string;
    tagId: string[];
}



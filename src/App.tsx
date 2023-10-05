import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewNote from "./pages/Form/NewNote";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { NoteData, RawNote, Tag } from "./types/types";
import { useLocalStorage } from "./useLocalStorage";
import { v4 } from "uuid";
import { useMemo } from "react";
import MainPage from "./pages/MainPage";
import NoteDetail from "./pages/NoteDetail/NoteDetail";
import EditNote from "./pages/Form/EditNote";
import Layout from "./pages/NoteDetail/Layout";

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("notes", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);

  const noteWithTags = useMemo(() => {
    return notes.map((note) => ({
      ...note,
      tags: tags.filter((tag) => note.tagId.includes(tag.id)),
    }));
  }, [notes, tags]);

  const createNote = ({ tags, ...data }: NoteData) => {
    setNotes((prev: any) => [
      ...prev,
      { ...data, id: v4(), tagId: tags.map((tag) => tag.id) },
    ]);
  };

  const createTag = (tag: Tag) => {
    setTags((prev: any) => [...prev, tag]);
  };

  const deleteNote = (id: string) => {
    const filtered = notes.filter((note) => note.id !== id);

    setNotes(filtered);
  };

  const handleEditNote = (id: string, { tags, ...data }: NoteData) => {
   const updated = notes.map((n)=>n.id===id ? {
      ...n,
      ...data,

      tagId : tags.map((tag)=>tag.id)
    }: n);
    setNotes(updated)
  };

  return (
    <BrowserRouter>
      <Container className="pt-4">
        <Routes>
          <Route
            path="/"
            element={<MainPage notes={noteWithTags} availableTags={tags} />}
          />
          <Route
            path="/new"
            element={
              <NewNote
                onSubmit={createNote}
                createTag={createTag}
                availableTags={tags}
              />
            }
          />
          <Route path="/:id" element={<Layout notes={noteWithTags} />}>
            <Route index element={<NoteDetail deleteNote={deleteNote} />} />
            <Route
              path="edit"
              element={
                <EditNote
                  onSubmit={handleEditNote}
                  createTag={createTag}
                  availableTags={tags}
                />
              }
            />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;

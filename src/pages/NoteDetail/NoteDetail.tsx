import { useNote } from "./Layout";
import { Row, Col, Stack,Button, Badge } from "react-bootstrap";
import {Link} from "react-router-dom"
import ReactMarkdown from "react-markdown"

type DetailProps ={
    deleteNote: (id:string)=>void
}

const NoteDetail = ({deleteNote}:DetailProps) => {
  const note = useNote();
  return (
    <>
    <Row>
      <Col>
        <h1>{note.title}</h1>

        {note.tags.length > 0 && (
          <Stack direction="horizontal">
            {note.tags.map((tag) => (
              <Badge>{tag.label}</Badge>
            ))}
          </Stack>
        )}
      </Col>
      <Col xs={"auto"}>
      <Stack direction="horizontal" gap={2}>
        <Link to={`/${note.id}/edit`}>
        <Button>Düzenle</Button>
        </Link>
        <Button onClick={()=>deleteNote(note.id)} variant="danger ">Sil</Button>
        <Link to={"/"}>
        <Button variant="secondary ">Geri</Button>
        </Link>
      </Stack>
      </Col>
    </Row>
      <ReactMarkdown>
        {note.markdown}
      </ReactMarkdown>
    </>
  );
};

export default NoteDetail;

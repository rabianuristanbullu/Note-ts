import { useEffect, useMemo, useState } from "react";
import { Note, Tag } from "../types/types";
import { Stack, Button, Form, Row, Col, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import styles from "./mainpage.module.css";

type MainProps = {
  notes: Note[];
  availableTags: Tag[];
};

const MainPage = ({ notes, availableTags }: MainProps) => {
  const [title, setTitle] = useState("");

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  
  const filtredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        // note'un başlığı aram metnini içeriyorsa ilgili başlıkları döndür
        (title === '' ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        // eğer hiç bir etiket seçilmediyse veya notun etiketlerinden biti
        // seçilen etiketlerinden biriyle eşleşen dödürür
        // every seçilen her etiket için some():çalıştırır >
        // notun etiketlerinin en az biri seçili etiketlerle eşleşiyor mu kontrol eder
        (selectedTags.length == 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <Stack direction="horizontal" className="justify-content-between mb-3">
        <h1> NOTLAR </h1>
        <Link to={"/new"}>
          <Button>Oluştur</Button>
        </Link>
      </Stack>

{/* filtreleme */}
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Başlığa Göre Ara</Form.Label>
              <Form.Control
                onChange={(event) => setTitle(event.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Etikete Göre Ara</Form.Label>
              <ReactSelect
                value={selectedTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                onChange={(tags) =>
                  setSelectedTags(
                    tags.map((tag) => ({
                      label: tag.label,
                      id: tag.value,
                    }))
                  )
                }
                options={availableTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                isMulti
                className="shadow"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {/* Listeleme */}
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3 mt-4">
        {filtredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} tags={note.tags} title={note.title} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default MainPage;

type CardType = {
  id: string;
  title: string;
  tags: Tag[];
};

function NoteCard({ id, title, tags }: CardType) {
  return (
    <Card as={Link} to={`/${id}`}  className={styles.card}>
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-between h-100"
        >
          <span>{title}</span>

          {tags.length > 0 && (
            <Stack
              className="justify-content-center flex-wrap "
              direction="horizontal"
            >
              {tags.map((tag) => (
                <Badge> {tag.label} </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}

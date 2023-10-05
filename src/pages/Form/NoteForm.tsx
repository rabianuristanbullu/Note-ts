import { FormEvent, useRef, useState } from "react";
import { Col, Row, Stack, Form, Button } from "react-bootstrap";
import ReactSelect from "react-select/creatable";
import { NewNoteProps } from "./NewNote";
import { Tag } from "../../types/types";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

const NoteForm = ({
  onSubmit,
  createTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NewNoteProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    navigate(-1); //(..)
  };
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Başlık</Form.Label>
              <Form.Control
              defaultValue={title}
                ref={titleRef}
                className="shadow"
                required
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Etiketler</Form.Label>
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
                onCreateOption={(label) => {
                  const newTag: Tag = { id: v4(), label };
                  createTag(newTag);
                  setSelectedTags([...selectedTags, newTag]);
                }}
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
        {/* Text Alanı */}
        <Form.Group>
          <Form.Label>İçerik</Form.Label>
          <Form.Control
            defaultValue={markdown}
            ref={markdownRef}
            as={"textarea"}
            rows={15}
            required
            className="shadow"
          />
        </Form.Group>
        {/* Button Alanı */}
        <Stack direction="horizontal" gap={3}>
          <Button type="submit">Kaydet</Button>
          <Button
            onClick={() => navigate(-1)}
            type="button"
            variant="secondary"
          >
            İptal
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default NoteForm;

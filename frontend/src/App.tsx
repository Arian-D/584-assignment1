import React, { FC, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, ListGroup, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ReactSortable } from "react-sortablejs";

interface TaskType {
  id: number;
  name: string;
  description: string;
  sort_field: number;
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: Date | null;
}

const SortableTasks: FC = (props) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  fetch("http://localhost:3000/task")
    .then(r => r.json())
    .then((json) => json.sort((v: TaskType) => v.sort_field))
    .then(setTasks)
    .catch(console.error)


  // console.log(tasks.map((v) => v.sort_field))
  return (
    <ListGroup>
      <ReactSortable list={tasks} setList={setTasks} onChange={(order, sortable, e) => {
        let tempTasks = tasks
        console.log(tempTasks.map((v) => v.sort_field))
        sortable?.toArray().forEach((v, i) => {
          tempTasks[i].sort_field = Number(v) + 1
        })
        setTasks(tempTasks)
      }}>
        {tasks.map((task) => (
          <ListGroup.Item key={task.sort_field}>
            {task.name}
            <br />
            <Button variant="secondary" onClick={() => {
              console.log("")
            }}>
              
              View Details
            </Button>

          </ListGroup.Item>
        ))}
      </ReactSortable>
    </ListGroup>
  );
};

function createTask(name: string, description: string) {
  fetch("http://localhost:3000/task", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      name: name,
      description: description,
    })
  }).then(console.log)
    .catch(console.error)
}


function App() {
  const [show, setShow] = useState(false);
  const [task, setTask] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                placeholder="Task name"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                autoFocus
              />

              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Some sort of description"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            createTask(task, description)
            setShow(false)
          }}>
            Create!
          </Button>
        </Modal.Footer>
      </Modal>

      <Button onClick={() => setShow(true)} variant="primary">Create New Task</Button>
      <SortableTasks />
    </>
  );
}

export default App;

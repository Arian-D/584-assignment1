import React, { FC, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, ListGroup, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ReactSortable } from "react-sortablejs";

interface TaskType {
  id: number;
  name: string;
  description: string;
  sort_field: number | null;
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: Date | null;
}

const SortableTasks: FC = (props) => {
  const [tasks, setTasks] = useState<TaskType[]>([
    // {id: 0, name: "Some Task", description: "Task Description", sort_field: 0, created_at: null, deleted_at: null, updated_at: null}
  ]);
  fetch("http://localhost:3000/task")
    .then(r => r.json())
    .then(setTasks)
    .catch(console.error)

  return (
    <ListGroup>
      <ReactSortable list={tasks} setList={setTasks} onChange={(e) => {
        console.log(e)
      }}>
        {tasks.map((task) => (
          <ListGroup.Item key={task.sort_field}>{task.name}</ListGroup.Item>
        ))}
      </ReactSortable>
    </ListGroup>
  );
};

function createTask() {
  
}


function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Task</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={createTask}>
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

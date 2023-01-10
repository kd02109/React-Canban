import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";
import BoardPlusBtn from "./components/BoardPlustBtn";
import Garbage from "./components/Garbage";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  position: relative;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  max-width: 90em;
  gap: 10px;
`;

const Boards = styled.div`
  grid-column: 1/-1;
  grid-row: 2/3;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  width: 100%;
  gap: 10px;
`;

//const toDos = ["a", "b", "c", "d", "e", "f"];

function App() {
  const [toDos, setTodos] = useRecoilState(toDoState);
  //const setTodos = useSetRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    console.log(source, destination, draggableId);

    if (!destination) return;
    if (destination?.droppableId === source?.droppableId) {
      //same board movemonet
      setTodos((oldObject): any => {
        const boardCopy = [...oldObject[source?.droppableId]];
        const taskOnject = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskOnject);
        return {
          ...oldObject,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId === "trash") {
      setTodos((oldObject): {} => {
        const sourceBoard = [...oldObject[source.droppableId]];
        sourceBoard.splice(source.index, 1);
        return {
          ...oldObject,
          [source.droppableId]: sourceBoard,
        };
      });
    }
    if (source?.droppableId !== destination?.droppableId) {
      setTodos((oldObject): any => {
        const sourceBoard = [...oldObject[source.droppableId]];
        const taskOnject = sourceBoard[source.index];
        const destinationBoard = [...oldObject[destination?.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskOnject);
        return {
          ...oldObject,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <BoardPlusBtn />
          <Boards>
            {Object.keys(toDos).map((boardId, index) => (
              <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
          <Garbage />
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;

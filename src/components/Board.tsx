import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoState } from "../atoms";
import DragabbleCard from "./DragabbleCard";

const Weapper = styled.div`
  width: 350px;
  padding: 10px 0px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  height: 350px;
  max-height: 350px;
  display: flex;
  flex-direction: column;
`;

const StyledFont = styled(FontAwesomeIcon)`
  visibility: hidden;
  color: red;
  &:hover {
    cursor: pointer;
  }
`;
const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  &:hover {
    ${StyledFont} {
      visibility: visible;
    }
  }
`;
const Title = styled.h1`
  text-align: center;
  font-weight: 600;
  font-size: 30px;
  margin-bottom: 10px;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.draggingFromThisWith
      ? "#b2bec3"
      : "transparent"};
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
  min-height: 150px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
`;

const Form = styled.form`
  align-self: center;
  width: 90%;
  display: flex;
  justify-content: center;
  input {
    width: 100%;
    padding: 10px 5px;
    background-color: ${(props) => props.theme.boardColor};
    border: none;
    border-bottom: 1px solid white;
    &:focus {
      outline: none;
    }
  }
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    const newTodo = { id: Date.now(), text: data.toDo };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newTodo],
      };
    });
    setValue("toDo", "");
  };

  const onClickDeletBoard = (boardId: string) => {
    console.log(boardId);
    setToDos((oldObject) => {
      const copyObject = { ...oldObject };
      delete copyObject[boardId];
      return copyObject;
    });
  };
  return (
    <Weapper>
      <TitleBox>
        <Title>{boardId}</Title>
        <StyledFont
          onClick={() => onClickDeletBoard(boardId)}
          icon={faCircleXmark}
          size="2x"
        />
      </TitleBox>

      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((todo, index) => (
              <DragabbleCard
                key={todo.id}
                todoText={todo.text}
                todoId={todo.id}
                index={index}
                boardId={boardId}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Weapper>
  );
}

export default Board;

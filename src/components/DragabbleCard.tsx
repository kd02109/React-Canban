import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";
import { useForm } from "react-hook-form";

interface ICardProps {
  isDraggin: boolean;
}

const CardFrom = styled.div`
  border-radius: 5px;
  margin-bottom: 3px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: ${(props) => props.theme.cardColor};
`;
const Btn = styled.button<ICardProps>`
  border: none;
  background-color: ${(props) =>
    props.isDraggin ? "#74b9ff" : props.theme.cardColor};
  cursor: pointer;
  visibility: hidden;
`;

const Card = styled.div<ICardProps>`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) =>
    props.isDraggin ? "#74b9ff" : props.theme.cardColor};
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 3px;
  box-shadow: ${(props) =>
    props.isDraggin ? "2px 2px 10px rgba(0,0,0,0.5)" : "none"};
  &:hover {
    ${Btn} {
      visibility: visible;
    }
  }
`;

interface IDragabble {
  todoId: number;
  todoText: string;
  index: number;
  boardId: string;
}
interface IEditTodo {
  editTodo: string;
}
function DragabbleCard({ todoId, index, todoText, boardId }: IDragabble) {
  const [edited, setEdited] = useState(false);

  const setToDos = useSetRecoilState(toDoState);

  const { register, handleSubmit, reset } = useForm<IEditTodo>();

  const onClickEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEdited(true);
    console.log(edited);
  };
  const onClickCancleEdit = () => {
    setEdited(false);
  };
  const onEditCard = ({ editTodo }: any) => {
    setToDos((oldCard): any => {
      const boardList = { ...oldCard };
      const targetContent = { ...oldCard[boardId][index] };
      const targetBoardContent = [...oldCard[boardId]];
      const newCard = {
        id: targetContent.id,
        text: editTodo,
      };
      targetBoardContent.splice(index, 1, newCard);
      return {
        ...boardList,
        [boardId]: targetBoardContent,
      };
    });
    setEdited(false);
  };
  console.log(todoId, "has been rendered");
  return (
    <Draggable draggableId={todoId.toString()} index={index}>
      {(magic, snapshot) =>
        edited ? (
          <CardFrom>
            <form onSubmit={handleSubmit(onEditCard)}>
              <input
                {...register("editTodo")}
                type="text"
                placeholder="Type here..."
                defaultValue={todoText}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    reset({
                      editTodo: todoText,
                    });
                    setEdited(false);
                  }
                }}
              />
            </form>
            <FontAwesomeIcon
              onClick={onClickCancleEdit}
              icon={faCircleXmark}
              size="xl"
            />
          </CardFrom>
        ) : (
          <Card
            isDraggin={snapshot.isDragging}
            ref={magic.innerRef}
            // react 코드를 이용해서 HTML 요소를 지정하고 가져올 수 있는 방법
            {...magic.dragHandleProps}
            {...magic.draggableProps}
          >
            {todoText}
            <Btn onClick={onClickEdit} isDraggin={snapshot.isDragging}>
              <FontAwesomeIcon icon={faPen} />
            </Btn>
          </Card>
        )
      }
    </Draggable>
  );
}

export default React.memo(DragabbleCard);

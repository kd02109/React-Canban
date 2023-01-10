import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Droppable } from "react-beautiful-dnd";

interface IGarbageProps {
  isDragging: boolean;
  isDragginWith: boolean;
}

const Wrapper = styled.div<IGarbageProps>`
  position: absolute;
  bottom: 10px;
  right: -30px;
`;

function Garbage() {
  return (
    <Droppable droppableId="trash">
      {(magic, snapshot) => (
        <Wrapper
          ref={magic.innerRef}
          {...magic.droppableProps}
          isDragging={snapshot.isDraggingOver}
          isDragginWith={Boolean(snapshot.draggingFromThisWith)}
        >
          <FontAwesomeIcon icon={faTrash} size="5x" color="red" />
          {magic.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
}

export default Garbage;

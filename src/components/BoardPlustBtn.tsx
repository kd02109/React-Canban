import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-column: 1/-1;
  align-self: center;
  max-width: 70em;
  padding: 20px;
  justify-self: center;
  border-radius: 20px;
  background-color: aliceblue;
  box-shadow: 1px 2px 10px black;
  min-width: 50em;
  form {
    input {
      min-width: 300px;
      padding: 10px 5px;
      width: 500px;
      border: none;
      background-color: aliceblue;
      border-bottom: 1px solid black;
      &:focus {
        outline: none;
      }
    }
  }
  h1 {
    font-weight: 600;
    font-size: 30px;
    margin-bottom: 20px;
  }
`;
interface IBoradProp {
  title: string;
}
function BoardPlusBtn() {
  const [boardList, setBoardList] = useRecoilState(toDoState);
  const { register, setValue, handleSubmit, getValues } = useForm<IBoradProp>();
  const onSubmitMakeBoard = () => {
    const { title } = getValues();
    const titles = Object.keys(boardList);
    if (!title) return;
    if (titles.includes(title)) return;
    setBoardList((toDos: any) => {
      const result = { [title]: [], ...toDos };
      console.log(result);

      return {
        ...result,
      };
    });
    setValue("title", "");
  };

  return (
    <Wrapper>
      <h1>새로운 보드를 입력하세요!</h1>
      <form onSubmit={handleSubmit(onSubmitMakeBoard)}>
        <input
          {...register("title", { required: true })}
          type="text"
          placeholder="Make new Canban Board"
        />
      </form>
    </Wrapper>
  );
}

export default BoardPlusBtn;

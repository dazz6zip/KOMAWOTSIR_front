import { useQuery } from "react-query";
import ButtonL from "../components/common/ButtonL";
import ButtonRow from "../components/common/ButtonRow";
import ButtonS from "../components/common/ButtonS";
import Title from "../components/common/Title";
import { DesignLoad, IDesign } from "../fetcher";

function DesignList() {
  const { isLoading, data } = useQuery<IDesign[]>(["designLoad"], () =>
    DesignLoad()
  );
  return (
    <>
      <Title>연하장 배경 변경하기</Title>
      <ButtonRow>
        <ButtonS category="blue">단색</ButtonS>
        <ButtonS category="gray">그라데이션</ButtonS>
        <ButtonS category="gray">일러스트</ButtonS>
        <ButtonS category="gray">시즌</ButtonS>
      </ButtonRow>
      {data?.map((design) => (
        <div>
          <img
            src={require(`../images/${design.name}.png`).default}
            alt={design.name}
          />
        </div>
      ))}
      <ButtonL category="blue">+ 직접 등록하기</ButtonL>
      <ButtonL category="pink">저장하기</ButtonL>
    </>
  );
}

export default DesignList;

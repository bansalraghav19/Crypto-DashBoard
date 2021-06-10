import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useLayoutEffect,
  memo,
} from "react";
import "./style.css";

interface Props {
  dataList: any[];
  onChange: (id: number) => void;
  currentCurrency: any;
}

const CustomSelect: React.FC<Props> = ({
  dataList,
  onChange,
  currentCurrency,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(currentCurrency?.uuid);
  const listConatinerRef = useRef<HTMLUListElement | null>(null);
  const activeOptionRef = useRef<HTMLLIElement | null>(null);

  const selectedElementRef = useCallback((node: HTMLLIElement | null) => {
    if (node) {
      activeOptionRef.current = node;
      node.scrollIntoView({ block: "nearest" });
    }
  }, []);

  useLayoutEffect(() => {
    setSelectedId(currentCurrency?.uuid);
  }, [currentCurrency]);

  const toggleOpen = () => setIsOpen((prevState) => !prevState);

  const handleOptionChange = (data: any) => {
    setIsOpen(false);
    onChange(data);
  };

  const handleKeyChange = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const curIndex = dataList.findIndex((data) => data.id === selectedId);
    switch (event.code) {
      case "Space":
        toggleOpen();
        break;
      case "Enter":
        toggleOpen();
        break;
      case "ArrowDown":
        const nextElement = dataList[curIndex + 1];
        if (nextElement) {
          onChange(nextElement);
        }
        break;
      case "ArrowUp":
        const prevElement = dataList[curIndex - 1];
        if (prevElement) {
          onChange(prevElement);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (isOpen && activeOptionRef.current) {
      listConatinerRef.current?.scrollTo(
        0,
        activeOptionRef.current.offsetTop / 2
      );
    }
  }, [isOpen]);

  return (
    <div
      tabIndex={0}
      className={`cs55selectContainer${isOpen ? " cs55Show" : ""}`}
      onBlur={() => setIsOpen(false)}
      onKeyDown={handleKeyChange}
    >
      <span onClick={toggleOpen} className="cs55selectLabel">
        {currentCurrency?.iconUrl && (
          <img
            className="mr-5"
            width="25px"
            height="25px"
            src={currentCurrency?.iconUrl}
          />
        )}
        <span className="cs55sym mr-5">{currentCurrency?.symbol || ""}</span>
        {currentCurrency?.sign && (
          <span className="cs55sym mr-auto">({currentCurrency?.sign})</span>
        )}
      </span>
      <ul ref={listConatinerRef} className="cs55selectOptionsContainer">
        {dataList.map((data) =>
          data?.sign ? (
            <li
              key={data?.uuid}
              ref={data?.uuid === selectedId ? selectedElementRef : null}
              onClick={() => handleOptionChange(data)}
              className={`cs55selectOption${
                data?.uuid === selectedId ? " cs55Selected" : ""
              }`}
            >
              {data?.iconUrl && <img className="mr-5" src={data?.iconUrl} />}
              <span className="cs55sym mr-5">{data?.symbol || ""}</span>
              <span className="cs55sym">({data?.sign})</span>
            </li>
          ) : (
            <span key={data?.uuid}></span>
          )
        )}
      </ul>
    </div>
  );
};

export default memo(CustomSelect);

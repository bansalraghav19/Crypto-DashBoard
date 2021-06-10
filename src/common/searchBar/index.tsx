import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  useLayoutEffect,
  memo,
} from "react";
import { Link } from "react-router-dom";
import useDebounce from "../../hooks/useDebouce";
import "./style.css";

const DEBOUNCED_TIME: number = 500;

interface PropsI {
  data: any;
}

const SearchBar: React.FC<PropsI> = (props) => {
  const [showSugesstionBox, setShowSugesstionBox] = useState<Boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchData, setSearchData] = useState([]);
  const deBouncedValue = useDebounce(searchValue, DEBOUNCED_TIME);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data } = props;

  useLayoutEffect(() => {
    // handler to check if user clicks outside the searchbar and suggestion Box container
    const handleClickOutside = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSugesstionBox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    const regex = new RegExp(deBouncedValue, "i");
    const filteredData = data?.filter((row: any) => {
      return row?.name?.match(regex) || row?.symbol?.match(regex);
    });
    setSearchData(filteredData);
  }, [deBouncedValue, data]);

  const clearSearchBar = () => {
    if (searchValue?.length) {
      setSearchValue("");
    }
  };

  const handleBlur = () => setShowSugesstionBox(false);

  const handleFocus = () => setShowSugesstionBox(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(event.target.value);

  return (
    <div className="sb1Container fadeInUp">
      <div
        tabIndex={0}
        ref={wrapperRef}
        className={`sb1searchInput ${showSugesstionBox && `sb1Show`}`}
      >
        <input
          type="text"
          className="sb1Input"
          placeholder="Type to Search"
          value={searchValue}
          onChange={handleChange}
          onFocus={handleFocus}
        />
        <ul className="sb1SuggestionBox">
          {/* {searchData?.length === 0 && <div>No Search Results Found</div>} */}
          {searchData?.map((row: any) => (
            <Link key={row?.uuid} to={`/coin/${row?.uuid}`}>
              <li
                style={{ color: row?.color }}
                className="sb1ListItem"
                onClick={handleBlur}
              >
                <span className="mr-auto">
                  <span className="mr-10">{row?.name}</span>
                  <img src={row?.iconUrl} />
                </span>
                <span>{row?.symbol}</span>
              </li>
            </Link>
          ))}
        </ul>
        <div className="sb1Icon">
          {showSugesstionBox ? (
            <i onClick={clearSearchBar} className="sb1fas fas fa-times"></i>
          ) : (
            <i className="sb1fas fas fa-search"></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(SearchBar);

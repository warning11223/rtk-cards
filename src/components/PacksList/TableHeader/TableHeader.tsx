import React from "react";
import { TableSearch } from "components/PacksList/TableHeader/TableSearch/TableSearch";
import { ShowCardsBtns } from "components/PacksList/TableHeader/ShowCardsBtns/ShowCardsBtns";
import { NumberOfCards } from "components/PacksList/TableHeader/NumberOfCards/NumberOfCards";
import { ResetFilterBtn } from "components/PacksList/TableHeader/ResetFilterBtn/ResetFilterBtn";
import s from "./TableHeader.module.scss";

type Props = {
  search: string
  setSearch: (value: string) => void
  showPacks: string
  setShowPacks: (value: string) => void
  cardsNumber: number[]
  setCardsNumber: (value: number[]) => void
  resetHandler: () => void
}

export const TableHeader: React.FC<Props> = (props) => {
  const {
    setShowPacks,
    showPacks,
    search,
    setSearch,
    setCardsNumber,
    cardsNumber,
    resetHandler
  } = props;

  return (
    <div className={s.tableHeader}>
      <TableSearch search={search} setSearch={setSearch} />
      <ShowCardsBtns showPacks={showPacks} setShowPacks={setShowPacks} />
      <NumberOfCards
        cardsNumber={cardsNumber}
        setCardsNumber={setCardsNumber}
      />
      <ResetFilterBtn resetHandler={resetHandler}/>
    </div>
  );
};


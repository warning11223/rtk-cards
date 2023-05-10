import React from "react";

import s from "./TableHeader.module.scss";
import { TableSearch } from "components/PacksList/TableHeader/TableSearch/TableSearch";
import { ShowCardsBtns } from "components/PacksList/TableHeader/ShowCardsBtns/ShowCardsBtns";
import { NumberOfCards } from "components/PacksList/TableHeader/NumberOfCards/NumberOfCards";
import { ResetFilterBtn } from "components/PacksList/TableHeader/ResetFilterBtn/ResetFilterBtn";

type Props = {
  search: string
  setSearch: (value: string) => void
}

export const TableHeader: React.FC<Props> = ({search, setSearch}) => {
  return (
    <div className={s.tableHeader}>
      <TableSearch
        search={search}
        setSearch={setSearch}
      />
      <ShowCardsBtns />
      <NumberOfCards />
      <ResetFilterBtn />
    </div>
  );
};


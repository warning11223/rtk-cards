import React, { useEffect, useState } from "react";
import s from "components/PacksList/PacksTable/PacksTable.module.scss";

import { packsThunks } from "features/packs/packsSlice";
import { useAppSelector } from "common/hooks/useAppSelector";
import { PacksListHeader } from "components/PacksList/PacksListHeader";
import { TableHeader } from "components/PacksList/TableHeader";
import { TablePagination } from "components/PacksList/TablePagination";

import { useActions } from "common/hooks/useActions";
import { selectCardPacksTotalCount, selectPageCount } from "features/packs/packsSelectors";
import { PacksTable } from "./PacksTable";

export const PacksList = () => {
  const countPage = useAppSelector(selectPageCount);
  const packsTotalCount = useAppSelector(selectCardPacksTotalCount);
  const [page, setPage] = useState(1);
  const [numberOfDisplayed, setNumberOfDisplayed] = useState(countPage <= 0 ? 4 : countPage);
  const [search, setSearch] = useState("");
  const [showPacks, setShowPacks] = useState("");
  const [cardsNumber, setCardsNumber] = useState([0, 100]);
  const [sort, setSort] = useState("0updated");
  const { getPacks } = useActions(packsThunks);

  useEffect(() => {
    getPacks({
      pageCount: numberOfDisplayed,
      page,
      packName: search,
      user_id: showPacks,
      min: cardsNumber[0],
      max: cardsNumber[1],
      sortPacks: sort
    });
  }, [numberOfDisplayed, page, search, showPacks, cardsNumber, sort]);

  const resetHandler = () => {
    setNumberOfDisplayed(4);
    setPage(1);
    setSearch("");
    setShowPacks("");
    setCardsNumber([0, 100]);
  };

  return (
    <div className={s.packs}>
      {
        <div className={s.packs__wrapper}>
          <PacksListHeader />
          <TableHeader
            search={search}
            setSearch={setSearch}
            showPacks={showPacks}
            setShowPacks={setShowPacks}
            cardsNumber={cardsNumber}
            setCardsNumber={setCardsNumber}
            resetHandler={resetHandler}
          />
          <PacksTable
            sort={sort}
            setSort={setSort}
          />
          <TablePagination
            numberOfDisplayed={numberOfDisplayed}
            setNumberOfDisplayed={setNumberOfDisplayed}
            page={page}
            setPage={setPage}
            totalCount={packsTotalCount}
          />
        </div>
      }
    </div>
  );
};

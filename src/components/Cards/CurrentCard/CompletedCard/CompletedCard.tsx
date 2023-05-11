import React, { useEffect, useState } from "react";

import s from "./CompletedCard.module.scss";
import { TableSearch } from "components/PacksList/TableHeader/TableSearch/TableSearch";
import Button from "@mui/material/Button/Button";
import { CardTable } from "components/Cards/CurrentCard/CompletedCard/CardTable/CardTable";
import { TablePagination } from "components/PacksList/TablePagination/TablePagination";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { cardsThunks } from "features/cards/cardsSlice";
import { toast } from "react-toastify";
import { selectCardsTotalCount } from "features/cards/cardsSelectors";

type Props = {
  id: string
}

export const CompletedCard: React.FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const cardsTotalCount = useAppSelector(selectCardsTotalCount);
  const [sort, setSort] = useState("0grade");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(4);

  useEffect(() => {
    dispatch(cardsThunks.getCards({
      cardsPack_id: id,
      sortCards: sort,
      cardQuestion: search,
      page,
      pageCount
    }))
      .unwrap()
      .catch(err => {
        toast.error(err.e.response.data.error);
      });
  }, [sort, search, page, pageCount]);

  return (
    <div className={s.completed}>
      <div className={s.completed__header}>
        <div className={s.completed__search}>
          <TableSearch search={search} setSearch={setSearch} />
          <Button
            variant="contained"
            color={"warning"}
            sx={{ borderRadius: "2rem", height: "40px" }}
            onClick={() => {
            }}
          >Learn to pack</Button>
        </div>
        <CardTable setSort={setSort} />
        <TablePagination
          numberOfDisplayed={pageCount}
          setNumberOfDisplayed={setPageCount}
          page={page}
          setPage={setPage}
          totalCount={cardsTotalCount}
        />
      </div>
    </div>
  );
};


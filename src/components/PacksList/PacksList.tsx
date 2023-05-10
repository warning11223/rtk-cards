import React, { useEffect, useState } from "react";
import s from "components/PacksList/PacksTable/PacksTable.module.scss";
import { PacksTable } from "components/PacksList/PacksTable/PacksTable";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { packsThunks } from "features/packs/packsSlice";
import { useAppSelector } from "common/hooks/useAppSelector";
import { selectAuthLoading, selectPageCount } from "features/auth/authSelectors";
import { Loading } from "features/auth/authSlice";
import { Loader } from "components/Loader/Loader";
import { PacksListHeader } from "components/PacksList/PacksListHeader/PacksListHeader";
import { TableHeader } from "components/PacksList/TableHeader/TableHeader";
import { TablePagination } from "components/PacksList/TablePagination/TablePagination";

export const PacksList = () => {
  const dispatch = useAppDispatch();
  const countPage = useAppSelector(selectPageCount);
  const [page, setPage] = useState(1);
  const [numberOfDisplayed, setNumberOfDisplayed] = useState(countPage <= 0 ? 4 : countPage);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(packsThunks.getPacks({
      pageCount: numberOfDisplayed,
      page,
      packName: search
    }));
  }, [numberOfDisplayed, page, search]);

  return (
    <div>
      {
        <div className={s.packs__wrapper}>
          <PacksListHeader />
          <TableHeader
            search={search}
            setSearch={setSearch}
          />
          <PacksTable />
          <TablePagination
            numberOfDisplayed={numberOfDisplayed}
            setNumberOfDisplayed={setNumberOfDisplayed}
            page={page}
            setPage={setPage}
          />
          {/*<div className={s.packs}>
              <PacksTable />
            </div>*/}
        </div>
      }
    </div>
  );
};

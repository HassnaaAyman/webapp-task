import { useState } from "react";
import { useQuery } from "react-query";
import { axiosApiInstance } from "../../infrastructure/utils/api";

const Repositories = () => {
  const [page, SetPage] = useState<number>(1);

  const { data, isLoading } = useQuery(
    ["repos", page],
    () =>
      axiosApiInstance.get(
        `search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${page}`
      ),
    {
      keepPreviousData: true,
      enabled: false,
    }
  );

  return <></>;
};

export default Repositories;

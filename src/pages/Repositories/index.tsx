import { useEffect, useState } from "react";
import Layout from "../../common/Layout";
import { axiosApiInstance } from "../../infrastructure/api/api";
import { List, Avatar, Skeleton, Divider } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { RepoProps } from "../../infrastructure/types";

const Repositories = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Array<RepoProps>>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    setPage(page + 1);
    axiosApiInstance
      .get(
        `search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${page}&per_page=100`
      )
      .then((res) => {
        console.log({ res });

        setData([...data, ...res.data.items]);
        setTotal(res.data.total_count);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <Layout>
      <div
        id="scrollableDiv"
        style={{
          height: "90%",
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < total}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            rowKey="id"
            loading={loading}
            size="large"
            renderItem={(item: RepoProps) => {
              return (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={<Avatar size={100} src={item.owner.avatar_url} />}
                    title={item.name}
                    description={item.description}
                  />
                  <List.Item.Meta
                    title={item.stargazers_count + " " + "stars"}
                    description={item.open_issues_count + " " + "issues"}
                  />
                </List.Item>
              );
            }}
          />
        </InfiniteScroll>
      </div>
    </Layout>
  );
};

export default Repositories;

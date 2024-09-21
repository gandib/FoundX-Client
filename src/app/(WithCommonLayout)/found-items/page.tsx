import Container from "@/src/components/UI/Container";
import Post from "@/src/components/UI/Post";
import axiosInstance from "@/src/lib/AxiosInstance";
import { IItem } from "@/src/types";

export default async function page() {
  const { data } = await axiosInstance(`/items`);

  return (
    <Container>
      <div className="mx-auto my-3 max-w-[720px]">
        {data?.data?.map((post: IItem) => <Post key={post._id} post={post} />)}
      </div>
    </Container>
  );
}

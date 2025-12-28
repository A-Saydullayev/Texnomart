const NewsDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return <div>NewsDetail:{id}</div>;
};

export default NewsDetail;

import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { blogid } = router.query; 
  return <div>Blog ID: {blogid}</div>;
};
export default Page


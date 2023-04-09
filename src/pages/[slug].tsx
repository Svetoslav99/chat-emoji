import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { appRouter } from "y/server/api/root";
import { api } from "y/utils/api";
import { prisma } from "y/server/db";
import superjson from "superjson";
import { PageLayout } from "y/components/layout";
import Image from "next/image";

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data } = api.profile.getUserByUsername.useQuery({
    username: "svetoslav",
  });

  if (!data) return <div>404</div>;

  console.log(data.username);

  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>
      <PageLayout>
        <div className="relative h-36 bg-slate-600">
          <Image
            src={data.profilePicture}
            alt={`${data.username ?? ""}'s profile pic`}
            width={128}
            height={128}
            className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-2 border-black bg-black"
          />
        </div>
        <div className="h-[64px]"></div>
        <div className="p-4 text-2xl font-bold">{`@${
          data.username ?? ""
        }`}</div>
        <div className="w-full border-b border-slate-400"></div>
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson,
  });

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("no slug");

  const username = slug.replace("@", "");

  await ssg.profile.getUserByUsername.prefetch({ username });

  return {
    props: {
      trpcStae: ssg.dehydrate(), // this takes all the things we fetched, then puts them in a shape that can be parsed through nextjs server side props (in this case static props)
      username,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "bloking" };
};

export default ProfilePage;

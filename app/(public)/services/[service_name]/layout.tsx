import { type Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { service_name: string; description: string };
}): Promise<Metadata> {
  const { service_name, description } = await params;
  return {
    title: service_name
      ? `${service_name} | Peace Home Empire`
      : "Peace Home Empire",
    description,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { Nav } from "@/components/ui/nav/nav";

export default function ProductPageLayout(props) {
  return (
    <MaxWidthWrapper className="flex flex-col min-h-screen">
      <Nav />
      {props.children}
    </MaxWidthWrapper>
  );
}

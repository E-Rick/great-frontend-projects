import Providers from "./providers";

export default function ProductPageLayout(props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Providers>{props.children}</Providers>
    </div>
  );
}

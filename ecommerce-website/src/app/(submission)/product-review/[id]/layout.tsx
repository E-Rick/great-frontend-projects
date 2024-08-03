import Providers from "./providers";

export default function ProductPageLayout(props) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#F9FAFB] to-[#D2D6DB] p-4">
      <Providers>{props.children}</Providers>
    </div>
  );
}

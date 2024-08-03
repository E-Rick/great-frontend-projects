import Providers from "./providers";

export default function ProductPageLayout(props) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#F9FAFB] to-[#D2D6DB] p-4">
      <div className="flex w-full flex-1 flex-col items-center justify-center rounded-md bg-white shadow-sm md:shadow-md lg:shadow-lg">
        <Providers>{props.children}</Providers>
      </div>
    </div>
  );
}

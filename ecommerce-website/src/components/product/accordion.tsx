// https://stackoverflow.com/questions/11556493/second-line-in-li-starts-under-the-bullet-after-css-reset
export function Accordion({
  title,
  content,
}: {
  title: string;
  content: string[];
}) {
  return (
    <div className="mb-6 border-b border-neutral-200 last:mb-0 last:border-none">
      <details className="group">
        <summary className="m-auto flex w-full cursor-pointer items-center justify-between pb-8 text-lg font-medium focus-visible:ring-brand">
          {title}
          <span aria-hidden={true}>
            <Icon />
          </span>
        </summary>
        <div className="-mt-6 mb-7 overflow-hidden opacity-0 transition-all duration-300 ease-in-out group-open:opacity-100">
          <ul className="ml-[1.25rem] list-outside list-disc pr-12 text-base text-neutral-600">
            {content.map((text, i) => (
              <li key={i}>{text}</li>
            ))}
          </ul>
        </div>
      </details>
    </div>
  );
}

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className=""
    >
      <circle r="9" cx="12" cy="12" stroke="#A3A3A3" strokeWidth="2" />
      <rect width="10" height="2" fill="#A3A3A3" y="11" x="7" />
      <rect
        width="2"
        height="10"
        fill="#A3A3A3"
        y="7"
        x="11"
        className="origin-center transform transition duration-200 ease-out group-open:scale-y-0"
      />
    </svg>
  );
}

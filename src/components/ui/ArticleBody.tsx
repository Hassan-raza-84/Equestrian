import type { Block } from "@/content/journal";

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="max-w-[40rem] text-body text-ink">
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2 key={i} className="mt-14 mb-4 font-display text-display-md text-green-900">
              {block.text}
            </h2>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={i} className="my-6 list-disc space-y-2 pl-6 marker:text-brass">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="my-6">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrandMark } from "@/components/brand/BrandMark";
import { Wordmark } from "@/components/brand/Wordmark";
import { BehaviourLab } from "./BehaviourLab";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const palette = [
  { name: "cream-50", hex: "#FBF7EC", use: "Lightest surface", cls: "bg-cream-50" },
  { name: "cream-100", hex: "#F3ECD9", use: "Page background", cls: "bg-cream-100" },
  { name: "cream-300", hex: "#E3D8BD", use: "Hairlines, quiet fills", cls: "bg-cream-300" },
  { name: "green-900", hex: "#0B2A1E", use: "Splash, footer, curtain", cls: "bg-green-900" },
  { name: "green-700", hex: "#1C4B32", use: "Brand green (matches the logo)", cls: "bg-green-700" },
  { name: "green-500", hex: "#2F6B49", use: "Hover and secondary on green", cls: "bg-green-500" },
  { name: "ink", hex: "#17211B", use: "Body text", cls: "bg-ink" },
  { name: "ink-muted", hex: "#56645B", use: "Secondary text", cls: "bg-ink-muted" },
  { name: "brass", hex: "#9A7640", use: "Focus ring, rare hairline", cls: "bg-brass" },
];

const contrast = [
  ["ink on cream-100", "14.0"],
  ["ink-muted on cream-100", "5.3"],
  ["green-700 on cream-100", "8.5"],
  ["cream-100 on green-700", "8.5"],
  ["cream-100 on green-900", "13.1"],
  ["cream-300 on green-900", "10.9"],
  ["brass on cream-100 (focus ring)", "3.5"],
  ["brass on green-900 (focus ring)", "3.7"],
];

export default function DesignSystem() {
  return (
    <>
      <Section className="pt-[clamp(3rem,6vw,5rem)]">
        <Container>
          <h1 className="font-display text-display-lg text-green-900">Design system</h1>
          <p className="mt-6 max-w-xl text-lead text-ink-muted">
            Everything the foundation provides, in one place. This page is hidden from search engines.
          </p>
        </Container>
      </Section>

      <Section className="border-t border-cream-300 !py-16">
        <Container>
          <h2 className="font-display text-display-md text-green-900">Colour</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {palette.map((c) => (
              <li key={c.name}>
                <div className={`h-24 border border-cream-300 ${c.cls}`} />
                <p className="mt-3 font-medium">{c.name}</p>
                <p className="text-small text-ink-muted">
                  {c.hex}. {c.use}
                </p>
              </li>
            ))}
          </ul>
          <h3 className="mt-14 font-display text-display-md text-green-900">Contrast</h3>
          <table className="mt-4 w-full max-w-xl text-left text-small">
            <tbody>
              {contrast.map(([pair, ratio]) => (
                <tr key={pair} className="border-b border-cream-300">
                  <th scope="row" className="py-2 pr-6 font-normal">
                    {pair}
                  </th>
                  <td className="py-2">{ratio}:1</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </Section>

      <Section className="border-t border-cream-300 !py-16">
        <Container>
          <h2 className="font-display text-display-md text-green-900">Type</h2>
          <div className="mt-8 grid gap-10">
            <p className="font-display text-display-xl text-green-900">Display extra large</p>
            <p className="font-display text-display-lg text-green-900">Display large</p>
            <p className="font-display text-display-md text-green-900">Display medium</p>
            <p className="max-w-2xl text-lead">Lead text sets up a section in a calm, confident voice. It stays short.</p>
            <p className="max-w-prose text-body">
              Body text in Hanken Grotesk keeps lines under seventy characters and uses a generous line height, so
              reading never feels like work. Curly {"\u2019"}apostrophes{"\u2019"} and {"\u201C"}quotation marks{"\u201D"} are used
              throughout, with en dashes for ranges such as 9{"\u2013"}5.
            </p>
            <p className="text-small text-ink-muted">Small text for captions and legal lines.</p>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-cream-300 !py-16">
        <Container>
          <h2 className="font-display text-display-md text-green-900">Mark and wordmark</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="flex items-center gap-6 bg-cream-50 p-10 text-green-700">
              <BrandMark className="h-auto w-40" />
              <Wordmark className="text-green-900" />
            </div>
            <div className="flex items-center gap-6 bg-green-900 p-10 text-cream-100">
              <BrandMark className="h-auto w-40" />
              <Wordmark />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-cream-300 !py-16">
        <Container>
          <h2 className="font-display text-display-md text-green-900">Buttons, links and focus</h2>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <a href="#main" className="link-underline py-1">A text link</a>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 bg-green-900 p-8">
            <Button tone="dark">Primary on green</Button>
            <Button tone="dark" variant="secondary">
              Secondary on green
            </Button>
          </div>
          <p className="mt-6 max-w-xl text-small text-ink-muted">
            Press Tab to see the brass focus ring on every control.
          </p>
        </Container>
      </Section>

      <Section className="border-t border-cream-300 !py-16">
        <Container>
          <h2 className="mb-10 font-display text-display-md text-green-900">Behaviours</h2>
          <BehaviourLab />
        </Container>
      </Section>
    </>
  );
}

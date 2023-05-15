import NotionPage from "app/_notion/NotionPage"

export const revalidate = 86400

export default async function ExperiencePage() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl">
        <h1 className="py-10 text-center text-5xl font-bold md:text-left lg:text-7xl">
          Experience &amp; resume
        </h1>
      </div>

      <div className="bg-[#F1F1F1] px-3 sm:px-8">
        <div className="mx-auto max-w-6xl pt-6">
          {/* @ts-expect-error */}
          <NotionPage pageId="155db39d4a314bc6800d094e23fb535d" />
        </div>
      </div>
    </section>
  )
}

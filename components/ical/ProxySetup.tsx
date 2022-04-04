import kthLogo from "@/public/ical/kth.svg"
import { proxiedUrl, useCalendarHits } from "lib/calendar"
import Image from "next/image"
import Link from "next/link"
import { SetStateAction } from "react"

export default function ProxySetup({
  kthUrl,
  setKthUrl,
}: {
  kthUrl: string | null
  setKthUrl: (value: SetStateAction<string | null>) => void
}) {
  const { hitsLoaded, hits, latestHit } = useCalendarHits(kthUrl)

  return (
    <ol className="relative left-5 top-5 border-l border-gray-200">
      <li className="mb-10 ml-8">
        <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white font-semibold ring-8 ring-white">
          1.
        </span>
        <h3 className="mb-1 flex items-center text-lg font-semibold text-gray-900">
          Get exported calendar url from KTH
        </h3>
        <p className="mb-4 text-gray-500">
          KTH has the ability to export your schedule as a icalendar file. It
          can be enabled and copied on the paged linked to below.
        </p>
        <a
          href="https://www.kth.se/social/home/calendar/settings/"
          target="_blank"
          rel="noreferrer"
          className="button"
        >
          <span className="mr-2 h-4 w-4">
            <Image src={kthLogo} alt="KTH logotype" />
          </span>{" "}
          KTH calendar settings
        </a>
      </li>
      <li className="mb-10 ml-8">
        <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white font-semibold ring-8 ring-white">
          2.
        </span>
        <h3 className="mb-1 text-lg font-semibold text-gray-900">
          Enter KTH calendar url
        </h3>
        <p className="mb-2 text-gray-500">
          Enter the page received during the previous step here to get access to
          your personal rules that can be customized and saved next time you
          return.
        </p>
        <div className="flex flex-col gap-1">
          <label htmlFor="kthUrl">Exported calendar url:</label>
          <input
            className="form-input w-fit max-w-full rounded-lg border border-gray-200 px-4 py-3 invalid:bg-rose-700/25"
            id="kthUrl"
            name="kthUrl"
            type="url"
            value={kthUrl || ""}
            onChange={(e) => {
              setKthUrl(e.target.value)
            }}
            size={(kthUrl || {}).length}
            placeholder="https://www.kth.se/social/user/.../icalendar/..."
          />
        </div>
      </li>

      {kthUrl && (
        <>
          <li className="mb-10 ml-8">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white font-semibold ring-8 ring-white">
              3.
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900">
              Configure filtering rules
            </h3>
            <p className="mb-2 text-gray-500">
              Change the filters and rules below to show or hide specific events
              based on regular exceptions, hide or show specific events and
              preview events during the coming week.
            </p>
            <Link href={{ query: { tab: "regexrules" } }}>
              <a className="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>{" "}
                Edit rules
              </a>
            </Link>
          </li>
          <li className="mb-10 ml-8">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white font-semibold ring-8 ring-white">
              4.
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900">
              Add the proxied url to your calendar
            </h3>
            <p className="mb-2 text-gray-500">
              A updated calendar with your rules applied are available at the
              link below. It can be added to{" "}
              <a
                href="https://calendar.google.com"
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                Google Calendar
              </a>{" "}
              for example just like the original KTH exported calendar.
            </p>

            {hitsLoaded && (
              <p className="mb-2 text-slate-900">
                The proxied url has been used{" "}
                <span className="font-semibold">{hits}</span> times. Last time
                was{" "}
                <span className="font-semibold">
                  {latestHit.toLocaleString()}
                </span>
                .
              </p>
            )}

            <div className="inline-flex max-w-full select-all rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900">
              <span className="truncate">{proxiedUrl(kthUrl) || ""}</span>
              <button
                title="Copy link to clipboard"
                onClick={() => {
                  const url = proxiedUrl(kthUrl)
                  if (navigator) {
                    url && navigator.clipboard.writeText(url)
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-5 w-5 text-indigo-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  />
                </svg>
              </button>
            </div>
          </li>
        </>
      )}
    </ol>
  )
}

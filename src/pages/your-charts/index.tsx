import SearchResultsWrapper from "../../components/global/Desktop/YourCharts/SearchResultsWrapper";

export function YourCharts() {
  return (
    <SearchResultsWrapper
      page={
        <div className="h-full">
          <div className="px-4">
            <h1 className="mb-8 text-4xl font-bold">
              Welcome to your charts list!
            </h1>
            <ul className="list-inside list-disc text-xl">
              <li>
                To view a chart, simply click the chart you wanna see on the
                left
              </li>
              <li>
                From there, you can share these charts, edit them further, or
                delete them
              </li>
              <li>[TODO] Allow for sorting by chart size, created at, etc</li>
            </ul>
          </div>
        </div>
      }
    />
  );
}

export default YourCharts;


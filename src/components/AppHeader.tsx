export const AppHeader = ({
  appName = "Comments Feed",
}: {
  appName?: string;
}) => (
  <div className="w-full">
    <h1>{appName}</h1>
  </div>
);

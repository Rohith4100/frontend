
import PhysicianReportDetails
  from "@/components/physician-report-details";

export default async function Page({
  params,
}) {
  const { resultId } =
    await params;

  return (
    <PhysicianReportDetails
      resultId={resultId}
    />
  );
}
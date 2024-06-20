import { useGetOverviewQuery } from "@/redux/apiSlices/dashboardApi";
import IncomeOverviewChart from "./IncomeOverviewChart";
import SealOverviewChart from "./SealOverviewChart";

const ChartArea = () => {
  const { data, isLoading, isError } = useGetOverviewQuery(undefined)
  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      <SealOverviewChart data={data?.data?.yearlyUserGrowth?.last12MonthsData || []} />
      <IncomeOverviewChart data={data?.data?.yearlyIncomeGrowth?.last12MonthsData || []} />
    </div>
  );
};

export default ChartArea;

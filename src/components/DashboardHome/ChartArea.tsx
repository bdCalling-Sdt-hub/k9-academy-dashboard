import IncomeOverviewChart from "./IncomeOverviewChart";
import SealOverviewChart from "./SealOverviewChart";

const ChartArea = () => {
  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      <SealOverviewChart />
      <IncomeOverviewChart />
    </div>
  );
};

export default ChartArea;

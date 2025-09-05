import { StateDataProps } from "@/interfaces/interfaces";
import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

const StatesForestLoss = ({ stateData }: StateDataProps) => {
  const top5 = stateData.slice(0, 5);

  const chartData = {
    labels: top5.map((item) => item.abbreviation),
    datasets: [
      {
        data: top5.map((item) => item.loss_ha),
      },
    ],
  };

  const screenWidth = Dimensions.get("window").width - 48;

  return (
    <View className="bg-[#242038] rounded-2xl p-4">
      <Text className="text-gray-200 text-lg font-bold mb-4">
        📊 Top States by Forest Loss
      </Text>

      <BarChart
        data={chartData}
        width={screenWidth}
        height={260}
        yAxisLabel=""
        yAxisSuffix=" ha"
        fromZero={true}
        showValuesOnTopOfBars={true}
        chartConfig={{
          backgroundColor: "#242038",
          backgroundGradientFrom: "#242038",
          backgroundGradientTo: "#242038",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(96, 165, 250, ${opacity})`, // red
          labelColor: (opacity = 1) => `rgba(229, 231, 235, ${opacity})`,
          propsForBackgroundLines: {
            strokeWidth: 0,
          }
        }}
        style={{
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default StatesForestLoss;
import Header from '@/components/Header';
import PlanOption from '@/components/PlanOption';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Problem = () => {
  const { id } = useLocalSearchParams();
  const [state, setState] = useState<boolean | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const project = {
    tariff: [1000, 2500, 5500]
  }

  console.log(state)
  console.log(selectedAmount)

  return (
    <SafeAreaView className="flex-1 bg-[#010b13]">
      <LinearGradient
        colors={["#1e3a2f", "#0f2c3f", "#0a1625"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        <Header />

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 10,
            alignItems: "center",
            paddingVertical: 16,
            paddingBottom: 60
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <TouchableOpacity
              onPress={() => setState(true)}
            >
              <Text>True</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setState(false)}
            >
              <Text>False</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap justify-between w-full">
            {project.tariff.map((plan, idx) => (
              <View key={idx} className="w-[30%] mb-4">
                <PlanOption
                  idx={idx}
                  plan={plan}
                  isSelected={selectedAmount === plan}
                  onSelect={() => setSelectedAmount(plan)}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default Problem;
import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'

const signup = () => {
    return (
        <SafeAreaView className="flex-1 bg-[#010b13]">
            <LinearGradient
                colors={["#1e3a2f", "#0f2c3f", "#0a1625"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="flex-1"
            >
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        minHeight: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text className='text-white'>User signup</Text>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default signup;
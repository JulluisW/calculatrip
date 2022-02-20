import { Text, View, StyleSheet } from 'react-native'

export default function SavingCard({data}) {
  return (
    <View style={savingCardStyle.containter}>
      <View style={{width: "55%"}}>
        <Text style={{fontWeight: "bold"}}>{data.name}</Text>
        <Text>{data.savingDate}</Text>
      </View>
      <Text style={savingCardStyle.moneyText}>{data.amount}</Text>
    </View>
  )
}

const savingCardStyle = StyleSheet.create({
  containter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    marginVertical: 10,
    paddingVertical: 15,
    backgroundColor: "#fff"
  },
  moneyText: {
    fontSize: 18,
    fontWeight: "bold"
  }
})
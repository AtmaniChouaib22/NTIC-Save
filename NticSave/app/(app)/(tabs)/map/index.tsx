import React from "react"
import { StyleSheet, View } from "react-native"
import Mapbox from "@rnmapbox/maps"

Mapbox.setAccessToken(
  "pk.eyJ1IjoiY2hvdWFpYmF0bSIsImEiOiJjbThzMHg4MnIwcnY3MnFzY2NrOGp5ZGhlIn0.5nBccAEXi4vSnDB2HX01lA"
)

const App = () => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView style={styles.map}>
          <Mapbox.Camera
            zoomLevel={10}
            centerCoordinate={[6.5699, 36.2449]}
            animationDuration={0}
          />
        </Mapbox.MapView>
      </View>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: "60%",
    width: "100%",
  },
  map: {
    flex: 1,
  },
})

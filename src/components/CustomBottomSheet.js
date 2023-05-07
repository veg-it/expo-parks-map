import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import BottomSheet from 'react-native-raw-bottom-sheet'

function CustomBottomSheet({ bottomSheetRef, selectedPark }) {
  
  const BottomSheetBackground = ({ style }) => {
    return (
      <View
        style={[
          {
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            backgroundColor: 'blue',
          },
          { ...style },
        ]}
      />
    )
  }
  return (
    <View>
      <BottomSheet
        backgroundComponent={(props) => <BottomSheetBackground {...props} />}
        ref={bottomSheetRef}
        style={{ borderRadius: 40, overflow: 'hidden' }}
        closeOnDragDown={true}
        height={400}
        openDuration={250}>
        <View
          style={styles.container}
          >
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={styles.title}>{selectedPark?.name}</Text>
                <Text style={styles.coord}>
                  Координаты: {selectedPark?.center.latitude.toFixed(4)},{' '}
                  {selectedPark?.center.longitude.toFixed(4)}
                </Text>
                <Text style={styles.coord}>
                  Площа:{' '}
                  {selectedPark?.total_area
                    ? selectedPark.total_area + 'км2'
                    : 'Не зазначено'}
                </Text>
              </View>
              <View>
                <Image
                  source={require('../../assets/images/tree.png')}
                  style={{ width: 64, height: 64 }}
                />
              </View>
            </View>
            
            <ScrollView style={{marginTop: 15,height: 200}}>
            <Text style={styles.date}>
              Состояние парка на{' '}
              {selectedPark?.date
                ? selectedPark.date
                : new Date().toDateString()}
            </Text>
            <Text style={styles.description}>
              {selectedPark?.status
                ? selectedPark.status
                : 'Проблем не знайдено'}
            </Text>
            </ScrollView>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.customButton}>
              <Text style={styles.customButtonColor}>
                Повідомити про проблему
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.customButton}>
              <Text style={styles.customButtonColor}>
                Повідомити про рішення
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f1f3f6',
    // paddingTop: 50,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
  },
  coord: {
    fontSize: 14,
    color: '#3f3f3f',
  },
  date: {
    fontSize: 14,
    
    marginBottom: 5,
    fontWeight: '700',
  },
  description: {
    fontSize: 18,
    color: '#3f3f3f',
  },
  customButton: {
    padding: 10,
    flex: 1,
    backgroundColor: '#1c73e8',
    margin: 10,
    borderRadius: 8,
  },
  customButtonColor: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
})

export default CustomBottomSheet

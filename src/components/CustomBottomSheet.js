import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Modal,
} from 'react-native'
import BottomSheet from 'react-native-raw-bottom-sheet'
import { getParksProblems, addProblem } from '../api/index'
import AddProblemModal from './AddProblemModal'

function CustomBottomSheet({ bottomSheetRef, selectedPark }) {
  const [problems, setProblems] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  const handleOpenModal = () => {
    bottomSheetRef.current.close()
    setModalVisible(true)
  }

  useEffect(() => {
    if (selectedPark?.id != null) {
      console.log('useEffect for get problems')
      getProblems()
    }
  }, [selectedPark?.id])

  const getProblems = async () => {
    console.log('getProblems')
    if (!!selectedPark.id) {
      const problems = await getParksProblems(selectedPark.id)
      setProblems(problems.problems)
    }
  }

  const sendProblem = async (problem) => {
    let date = new Date()
    const timestamp = Math.floor(date.getTime() / 1000)
    const sendData = {
      parkId: selectedPark.id,
      date: timestamp,
      about: problem,
      is_solution: false,
    }
    await addProblem(sendData)
    getProblems()
    setModalVisible(false)
  }

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
        <View style={styles.container}>
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
                    ? selectedPark.total_area.toFixed(5) + ' км2'
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

            <View style={{ marginTop: 15, height: 200 }}>
              <Text style={styles.date}>
                Состояние парка на{' '}
                {selectedPark?.date
                  ? selectedPark.date
                  : new Date().toDateString()}
              </Text>
              <Text style={styles.description}>
                {problems.length != 0 ? (
                  <FlatList
                    data={problems}
                    keyExtractor={(item) => item.problemId.toString()}
                    renderItem={(problem) => {
                      return (
                        <Text>
                          Problem: {problem.item.about} Id:{' '}
                          {problem.item.problemId}
                        </Text>
                      )
                    }}
                  />
                ) : (
                  'Проблем не знайдено'
                )}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.customButton}
              onPress={handleOpenModal}>
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
      <Modal visible={modalVisible}>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <AddProblemModal onClose={handleCloseModal} onSubmit={sendProblem} />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: '#3f3f3f',
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

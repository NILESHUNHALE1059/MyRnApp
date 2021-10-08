import { StyleSheet, Text, View } from 'react-native'

const Try = () => {
    const [arr, setarr] = useState([1, 2, 3, 4])


    const deleteItem = (index) => {

        let arr2 = Array.from()

        arr2.splice(index, 1)
        setarr(arr2)

    }
    return (
        <View>
            {arr.map((item, index, arr) => {

                return (<Text key={index} onPress={() => deleteItem(index, item)} >{item}</Text>)
            })}
        </View>
    )
}

export default Try

const styles = StyleSheet.create({})

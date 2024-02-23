import { Alert, Button, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


export default function DoctorDetails() {
    const navigation = useNavigation()
    function openPage(url){
        Linking.openURL(url)
    }
    let name = "Booking feature"
  return (
    <ScrollView>
    <View  style={{backgroundColor:"#e4edeb", height:"100%"}}>
        <View style={{flexDirection:"row", justifyContent:"space-around", marginTop:1}}>
       
        <View style={styles.container} >
            <Image
            source={
                require("../../assets/images/amit.jpg")
            }
            style = {styles.docImage}
            ></Image>
            <View style={styles.docDetails}>
                <Text style={{color:"#000"}}>Dr. Amit Raj</Text>
                <Text style={{color:"#000"}}>Cardiologist</Text>
                <Text style={{color:"#000"}}>Plexus MedCare Hospital</Text>
                <Text style={{color:"#000"}}>Rajkot, Gujarat</Text>
            </View>
            
        </View>
       
        </View>
        <View style={styles.docTabContainer}>
            <View style={styles.doctorTabOutside}>
                <Text style={styles.tabFont}>Patient</Text>
                <View style={styles.doctorTabInside}>
                <Image  source={require("../../assets/icons/people.png")}></Image>
                <Text style={{marginLeft:4, color:"#000"}}>480+</Text>
                </View>
            </View>
            <View style={styles.doctorTabOutside}>
                <Text style={styles.tabFont}>Experience</Text>
                <View style={styles.doctorTabInside}>
                <Image  source={require("../../assets/icons/check.png")}></Image>
                <Text style={{marginLeft:4, color:"#000"}}>4 years +</Text>
                </View>
            </View>
            <View style={styles.doctorTabOutside}>
                <Text style={styles.tabFont}>Rating</Text>
                <View style={styles.doctorTabInside}>
                <Image  source={require("../../assets/icons/star.png")}></Image>
                <Text style={{marginLeft:4, color:"#000"}}>4.8</Text>
                </View>
            </View>
        </View>
        <View style={styles.bodyContainer}>
            <View style={styles.bodyContainerInside}>
                <Text style={styles.someFont}>About</Text>
                <Text style={{color:"#000"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos minus voluptates ea ipsum sit numquam, eveniet omnis sapiente at ipsa totam, quam accusamus beatae hic, temporibus fugiat blanditiis provident deleniti.</Text>
                    <View style={styles.readMore}>
                    <TouchableOpacity  onPress={()=>(openPage('https://en.wikipedia.org/wiki/Doctor'))}>
                        <Text style={{textDecorationLine:"underline", color:"#000"}}>Read more</Text>
                    </TouchableOpacity>
                    </View>
            </View>
            <View style={styles.bodyContainerInside}>
                <Text style={styles.someFont}>Availability</Text>
                <Text style={{color:"#000"}}>Mon - Fri : 7:30 - 16:30</Text>
            </View>
            <View style={styles.bodyContainerInside}>
                <Text style={styles.someFont}>Consultation Fee</Text>
                <Text style={{color:"#000"}}>Rs 800</Text>
            </View>
        </View>
        <View style={{marginHorizontal:16, marginBottom:32}}>
        <Button onPress={()=>navigation.navigate("Booking") } title='Book an Appointment'></Button>
        </View>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        paddingBottom: 32,
        paddingTop:10
    },
    docImage:{
        width: 150,
        height: 150,
        borderRadius: 200 / 2,
    },
    docDetails:{
        paddingVertical:8,
        justifyContent:"center",
        alignItems:"center",
        color:"#000"

    },
    docTabContainer:{
        flexDirection:"row",
        justifyContent:"space-around"
    },
    doctorTabInside:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginTop:2
    },
    doctorTabOutside:{
        paddingHorizontal:20,
        paddingVertical:5,
        backgroundColor: "#ffffff",
        borderRadius: 8
    },
    bodyContainer:{
        margin:16,
        
    },
    bodyContainerInside:{
        marginVertical: 16
    },
    tabFont:{
        fontSize:16,
        fontWeight:"500",
        color:"#000"
    },
    wishlist:{
        elevation:5
    },
    someFont: {
        fontSize:16,
        fontWeight: '500',
        color:"#000"
    },
    readMore:{
        backgroundColor:"#fff",
        width:100,
        paddingHorizontal: 20,
        paddingVertical:8,
        marginTop:16,
    }
    
})
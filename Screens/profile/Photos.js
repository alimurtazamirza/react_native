import React from 'react';
import { View, Text, Image, Button,StyleSheet,Dimensions,Modal} from 'react-native';
import ImageView from "react-native-image-viewing";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const images = [
    {
        uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4"
    },
    {
        uri: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
    },
    {
        uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34"
    },
    {
        uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111"
    }
];



const Photos = () => {
    const [visible, setIsVisible] = React.useState(false);
    // const [backClor, setBackClor] = React.useState("rgba(0, 0, 0, 0.1)");
    const changestatus = (val) => {      
        // if(val==true){
        //     setBackClor("black");
        // }else{
        //     setBackClor("rgba(0, 0, 0, 0.1)");
        // }
        setIsVisible(val);
        console.log("this is clicked");
    }
    

    return (
        <View>
             <ImageView
                images={images}
                imageIndex={0}
                visible={visible}
                swipeToCloseEnabled={false}
                presentationStyle="overFullScreen"
                onRequestClose={() => setIsVisible(false)}
             />
            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start",marginVertical:5}}>
                <Image
                    style={styles.galleryPics}
                    source={{ uri: 'https://picsum.photos/700' }}
                />
                
                <Image
                    style={styles.galleryPics}
                    source={{ uri: 'https://picsum.photos/700' }}
                />
                <Image
                    style={styles.galleryPics}
                    source={{ uri: 'https://picsum.photos/700' }}
                />
            </View>
            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start",marginVertical:5}}>
                <Image
                    style={styles.galleryPics}
                    source={{ uri: 'https://picsum.photos/700' }}
                />
                <Image
                    style={styles.galleryPics}
                    source={{ uri: 'https://picsum.photos/700' }}
                />
                <Image
                    style={styles.galleryPics}
                    source={{ uri: 'https://picsum.photos/700' }}
                />
            </View>
            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start",marginVertical:5}}>
                <Image
                    style={styles.galleryPics}
                    source={{ uri: 'https://picsum.photos/700' }}
                />
                <Image
                    style={styles.galleryPics}
                    source={{ uri: 'https://picsum.photos/700' }}
                />
            </View>
            <Button title="button" onPress={()=>{changestatus(true)}} />
        </View>
    );
};
const styles = StyleSheet.create({
    galleryPics:{
        width:windowWidth/3.5,
        height:windowWidth/3.5,
        marginHorizontal:3.5,
        borderRadius:10
      },
});
export default Photos;
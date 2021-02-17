import React, { useEffect,useState } from "react";
import { StyleSheet, View,TouchableNativeFeedback,FlatList,Text  } from "react-native";
import { Card, Title, Paragraph,Subheading, ActivityIndicator,} from "react-native-paper";
import { apiChangeAsyncData } from "../../redux/action/Notification";
import Colors from "../../constants/Colors";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import UserApi from "../../api/User";


function PackageList(props) {
  let date = moment(props.date).format("LLL");
  const dispatch = useDispatch();
  const [isRequesting, setIsRequesting] = useState(true);
  const locale = useSelector((state) => state.translation);
  const { user } = useSelector((state) => state.auth);
  const [list, setList] = useState([]);


    const getPackagelist = async (type) => {
        setIsRequesting(true);
        const response = await UserApi.getPackages(type);
        setIsRequesting(false);
        if (!response.ok) {
        alert(locale.something_went_wronge);
        return;
        }
        let { data, success } = response;
        setList(data.data);
        LoadDataFirst();
        
    };

    useEffect(()=>{
        getPackagelist('all');
    },[]);

    const LoadDataFirst = async () => {
        const response = await UserApi.dataFirst(user.id);
        if (response.ok) {
          dispatch(apiChangeAsyncData(response.data));
        }
      };

    const renderItem = ( item ) => {
        return(
        <View key={item.item.id}>
          <Card elevation={40} style={styles.loopContainer}>
            <TouchableNativeFeedback onPress={() => props.navigate.navigate("CreateSubscription", { id: item.item.id })}>
            <Card.Content>
              <Title style={{ fontFamily: "open-sans-bold", fontSize: 18,textAlign:"left",color:"#e74c3c" }}>
              {item.item.name}
              </Title><Paragraph>{locale.per_month_plan}</Paragraph>
              <Paragraph>— {item.item.picture_limit+" "+locale.pictures_can_be_uploaded}</Paragraph>
              <Paragraph>— {locale.top_position+" : "+item.item.position_limit}</Paragraph>
              <Paragraph>— {locale.send_msges_to+" "} {item.item.massages_limit} {" "+locale.users_per_month}</Paragraph>
            </Card.Content>
            </TouchableNativeFeedback>
          </Card>
        </View>
        )};

  if(isRequesting){
      return (
            <View style={styles.activityIndicatorWrapper}>
                <ActivityIndicator  size="large" animating={isRequesting}  />
            </View>
        );
  }

  return (
    <View>
      <View
        style={{
          padddingVertical: 8,
          backgroundColor: props.active == 1 ? "#edf2f6" : "#fff",
        }}
      >
      <View style={{flex:1}}>
       <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={(list, index) => list.id.toString()}
        />
       </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ddd" },
  autherAvatar: {
    backgroundColor: Colors.background,
    marginHorizontal: 10,
    marginHorizontal: 10,
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    height:400,
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loopContainer: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 6,
    borderColor:"#e74c3c",
    borderTopWidth:0,
    borderLeftWidth:1,
    borderRightWidth:1,
    borderBottomWidth:0,
    paddingVertical:10,
    paddingHorizontal:5,
    borderRadius: 25,
    borderWidth:2
  },
});

export default PackageList;

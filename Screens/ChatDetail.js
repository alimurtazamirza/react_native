import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { useSelector, useDispatch } from "react-redux";
import {
  apiUpdateMessages,
  apiChangeAsyncData,
} from "../redux/action/Notification";
import UserApi from "../api/User";

const ChatDetail = (props) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const auth = useSelector((state) => state.auth.user);
  const notify = useSelector((state) => state.notify);
  const { dp, itemId, title, header } = props.route.params;
  if (itemId) props.navigation.setOptions({ title: title });
  React.useEffect(() => {
    const parent = props.navigation.dangerouslyGetParent();
    LoadMessages();
    parent.setOptions({
      tabBarVisible: false,
    });
    return () => {
      LoadDataFirst();
      parent.setOptions({
        tabBarVisible: true,
      });
    };
  }, [notify.massages_count]);

  const LoadMessages = async () => {
    const response = await UserApi.getUserMessages(itemId, auth.id, header);
    if (response.ok) {
      let i = 0;
      var messagesArray = [];
      for (const obj of response.data.message) {
        messagesArray[i] = {
          _id: obj.id,
          text: obj.message,
          createdAt: obj.created_at,
          user: {
            _id: obj.from,
            name: obj.from == auth.id ? auth.name : title,
            avatar: obj.from == auth.id ? auth.dp : dp,
          },
        };
        i++;
      }
      if (messagesArray.length) {
        dispatch(apiUpdateMessages(header, response.data.count));
      }
      setMessages(messagesArray);
    }
  };

  const LoadDataFirst = async () => {
    const response = await UserApi.dataFirst(auth.id);
    if (response.ok) {
      dispatch(apiChangeAsyncData(response.data));
    }
  };
  const sendNewMassage = async (data) => {
    const response = await UserApi.sendMassage({
      message: data[0].text,
      receiver_id: itemId,
      user_id: auth.id,
    });
    if (!response.ok) {
      if(response.status == 401){
        return alert("You are not allowed to send massages");
      }
      return alert(locale.something_went_wronge);
    }
  };

  const onSend = useCallback((messages = []) => {
    sendNewMassage(messages);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth.id,
      }}
    />
  );
};

export default ChatDetail;

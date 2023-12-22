import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import LoginInfo_Context from "../context/LoginInfo/LoginInfo_Context";
import { AntDesign } from "@expo/vector-icons";
import Currency_Context from "../context/LoginInfo/Currency_Context";
import { showMessage } from "react-native-flash-message";
import queryString from "query-string";
import LottieView from "lottie-react-native";

import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";

const Profile = () => {
  const { token } = useContext(LoginInfo_Context);
  const { totalExpense, currency, getAmount } = useContext(Currency_Context);
  const [name, setName] = useState<string>("-");
  const [bio, setBio] = useState<string>("-");
  const [income, setIncome] = useState<number>(0);
  const [budget, setBudget] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [newName, setNewName] = useState<string>("-");
  const [newBio, setNewBio] = useState<string>("-");
  const [newIncome, setNewIncome] = useState<number>(0);
  const [newBudget, setNewBudget] = useState<number>(0);

  const actionSheetRef = useRef(null);

  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const closeActionSheet = () => {
    actionSheetRef.current?.hide();
  };

  const updateName = async () => {
    const apiUrl = "https://money-minder-lndt.onrender.com/api/users/editName";

    const Data = {
      id: token._id,
      name: newName.trim(),
    };

    const formDataString = queryString.stringify(Data);

    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // Add any additional headers if needed
        },
        body: formDataString,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("PATCH request successful:", responseData.msg);

      if (responseData.msg == "success") {
        showMessage({
          message: "Edited successfully!",
          type: "success",
          duration: 1500,
          floating: true,
          icon: "success",
        });
      } else {
        showMessage({
          message: "Some error occured!",
          type: "danger",
          duration: 1500,
          floating: true,
          icon: "danger",
        });
      }
      return responseData;
    } catch (error) {
      console.error("Error during POST request:", error);
      showMessage({
        message: "Please enter your valid details!",
        type: "danger",
        duration: 1500,
        floating: true,
        icon: "danger",
      });
    }
  };

  const updateBio = async () => {
    const apiUrl = "https://money-minder-lndt.onrender.com/api/users/editBio";

    const Data = {
      id: token._id,
      bio: newBio.trim(),
    };

    const formDataString = queryString.stringify(Data);

    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // Add any additional headers if needed
        },
        body: formDataString,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("PATCH request successful:", responseData.msg);

      if (responseData.msg == "success") {
        showMessage({
          message: "Edited successfully!",
          type: "success",
          duration: 1500,
          floating: true,
          icon: "success",
        });
      } else {
        showMessage({
          message: "Some error occured!",
          type: "danger",
          duration: 1500,
          floating: true,
          icon: "danger",
        });
      }
      return responseData;
    } catch (error) {
      console.error("Error during POST request:", error);
      showMessage({
        message: "Please enter your valid details!",
        type: "danger",
        duration: 1500,
        floating: true,
        icon: "danger",
      });
    }
  };

  const updateIncome = async () => {
    const apiUrl =
      "https://money-minder-lndt.onrender.com/api/users/editIncome";

    const Data = {
      id: token._id,
      income: newIncome,
    };

    const formDataString = queryString.stringify(Data);

    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // Add any additional headers if needed
        },
        body: formDataString,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("PATCH request successful:", responseData.msg);

      if (responseData.msg == "success") {
        showMessage({
          message: "Edited successfully!",
          type: "success",
          duration: 1500,
          floating: true,
          icon: "success",
        });
      } else {
        showMessage({
          message: "Some error occured!",
          type: "danger",
          duration: 1500,
          floating: true,
          icon: "danger",
        });
      }
      return responseData;
    } catch (error) {
      console.error("Error during POST request:", error);
      showMessage({
        message: "Please enter your valid details!",
        type: "danger",
        duration: 1500,
        floating: true,
        icon: "danger",
      });
    }
  };

  const updateBudget = async () => {
    const apiUrl =
      "https://money-minder-lndt.onrender.com/api/users/editBudget";

    const Data = {
      id: token._id,
      budget: newBudget,
    };

    const formDataString = queryString.stringify(Data);

    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // Add any additional headers if needed
        },
        body: formDataString,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("PATCH request successful:", responseData.msg);

      if (responseData.msg == "success") {
        showMessage({
          message: "Edited successfully!",
          type: "success",
          duration: 1500,
          floating: true,
          icon: "success",
        });
      } else {
        showMessage({
          message: "Some error occured!",
          type: "danger",
          duration: 1500,
          floating: true,
          icon: "danger",
        });
      }
      return responseData;
    } catch (error) {
      console.error("Error during POST request:", error);
      showMessage({
        message: "Please enter your valid details!",
        type: "danger",
        duration: 1500,
        floating: true,
        icon: "danger",
      });
    }
  };

  class Get_UserInfo {
    public getBio = async () => {
      const url = `https://money-minder-lndt.onrender.com/api/users/getBio/${token._id}`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const dataResponse = await response.json();
        return dataResponse;
      } catch (error) {
        console.error("Error fetching data:", error);
        return "";
      }
    };
    public getIncome = async () => {
      const url = `https://money-minder-lndt.onrender.com/api/users/getIncome/${token._id}`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const dataResponse = await response.json();
        return dataResponse;
      } catch (error) {
        console.error("Error fetching data:", error);
        return "";
      }
    };
    public getBudget = async () => {
      const url = `https://money-minder-lndt.onrender.com/api/users/getBudget/${token._id}`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const dataResponse = await response.json();
        return dataResponse;
      } catch (error) {
        console.error("Error fetching data:", error);
        return "";
      }
    };
    public getName = async () => {
      const url = `https://money-minder-lndt.onrender.com/api/users/getName/${token._id}`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const dataResponse = await response.json();
        return dataResponse;
      } catch (error) {
        console.error("Error fetching data:", error);
        return "";
      }
    };
  }

  const fetchData = async () => {
    try {
      const getUserInstance = new Get_UserInfo();
      const bio = await getUserInstance.getBio();
      const income = await getUserInstance.getIncome();
      const budget = await getUserInstance.getBudget();
      const name = await getUserInstance.getName();

      setBio(bio.Bio);
      setIncome(income.Income);
      setBudget(budget.Budget);
      setName(name.Name);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const setDefaultValues = async () => {
    try {
      const getUserInstance = new Get_UserInfo();
      const fetchedBio = await getUserInstance.getBio();
      const fetchedIncome = await getUserInstance.getIncome();
      const fetchedBudget = await getUserInstance.getBudget();
      const fetchedName = await getUserInstance.getName();

      setNewBio(fetchedBio.Bio);
      setNewIncome(fetchedIncome.Income);
      setNewBudget(fetchedBudget.Budget);
      setNewName(fetchedName.Name);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const saveUserInfo_Handler = async () => {
    const nameChanged = name !== newName.trim();
    const bioChanged = bio !== newBio.trim();
    const incomeChanged = income !== newIncome;
    const budgetChanged = budget !== newBudget;

    // If nothing has changed, return without making API calls
    if (!nameChanged && !bioChanged && !incomeChanged && !budgetChanged) {
      showMessage({
        message: "No changes made.",
        type: "info",
        duration: 1500,
        floating: true,
        icon: "info",
      });
      closeActionSheet();
      return;
    }

    // Make API calls for each updated piece of information
    if (nameChanged) {
      await updateName();
    }
    if (bioChanged) {
      await updateBio();
    }
    if (incomeChanged) {
      await updateIncome();
    }
    if (budgetChanged) {
      await updateBudget();
    }

    // Fetch new data after successful updates
    await fetchData(); // Wait for fetchData to complete

    // Set default values only if there were changes
    if (nameChanged || bioChanged || incomeChanged || budgetChanged) {
      setDefaultValues(); // Set default values based on fetched data
    }

    closeActionSheet();
  };

  useEffect(() => {
    const fetchDataAndSetDefaults = async () => {
      await fetchData(); // Wait for fetchData to complete
      await setDefaultValues(); // Set default values based on fetched data
    };

    fetchDataAndSetDefaults();
  }, []);

  useEffect(() => {
    console.log(newName, newBio, newIncome, newBudget);
  }, [newName, newBio, newIncome, newBudget]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.dp}>
          <Image
            style={{
              width: 91,
              height: 91,
              borderRadius: 90,
            }}
            source={require("../assets/user2.png")}
          />
        </View>

        {/* User Name */}
        <Text
          style={{
            color: "#3E4685",
            fontFamily: "sans-serif-medium",
            fontSize: 22,
            fontWeight: "bold",
            top: 150,
            position: "absolute",
          }}
        >
          {name}
        </Text>

        {/* Bio */}
        <Text
          style={{
            position: "absolute",
            top: 183,
            fontFamily: "sans-serif-medium",
          }}
        >
          {bio}
        </Text>

        <View style={styles.bottomInfo}>
          {/* Income */}
          <Text
            style={{
              color: "#3E4685",
              fontFamily: "sans-serif-medium",
              position: "absolute",
              left: 15,
              top: 6,
              fontSize: 17,
            }}
          >
            {currency == "dollar" ? "$" : "₹"}
            {getAmount(income)}
          </Text>
          <Text
            style={{
              position: "absolute",
              bottom: 28,
              left: 22,
            }}
          >
            Income
          </Text>

          {/* Divider */}
          <View
            style={{
              ...styles.divider,
              left: 88,
              bottom: -5,
            }}
          />

          <Text
            style={{
              color: "#3E4685",
              fontFamily: "sans-serif-medium",
              position: "absolute",
              left: 105,
              top: 6,
              fontSize: 17,
            }}
          >
            {currency == "dollar" ? "$" : "₹"}
            {getAmount(totalExpense)}
          </Text>
          <Text
            style={{
              position: "absolute",
              bottom: 28,
              left: 110,
            }}
          >
            Expenses
          </Text>

          {/* Divider */}
          <View
            style={{
              ...styles.divider,
              left: 188,
              bottom: 44,
            }}
          />

          <Text
            style={{
              color: "#3E4685",
              fontFamily: "sans-serif-medium",
              position: "absolute",
              left: 210,
              top: 6,
              fontSize: 17,
            }}
          >
            {currency == "dollar" ? "$" : "₹"}
            {getAmount(budget)}
          </Text>
          <Text
            style={{
              position: "absolute",
              bottom: 28,
              left: 210,
            }}
          >
            Budget
          </Text>
        </View>

        {/* Edit Profile Button */}
        <TouchableWithoutFeedback style={styles.editBtn}>
          <TouchableWithoutFeedback onPress={() => openActionSheet()}>
            <AntDesign name="edit" size={22} color="black" />
          </TouchableWithoutFeedback>
        </TouchableWithoutFeedback>
      </View>

      {/* Loading */}
      {loading ? (
        <View>
          <LottieView
            source={require("../assets/animations/loading.json")}
            autoPlay
            loop
            style={{
              width: 130,
              height: 130,
              alignSelf: "center",
              position: "absolute",
              top: 10,
            }}
          />
        </View>
      ) : null}

      {/* Edit Profile Action Sheet */}

      <ActionSheet ref={actionSheetRef}>
        <View
          style={{
            backgroundColor: "#F3F8FE",
            alignItems: "center",
            justifyContent: "center",
            height: Dimensions.get("window").height * 1.7,
            width: Dimensions.get("window").width,
            top: -80,
          }}
        >
          <ScrollView contentContainerStyle={styles.ActionSheetContainer}>
            <Text
              style={{
                color: "#3E4685",
                fontFamily: "sans-serif-medium",
                fontSize: 25,
                fontWeight: "bold",
                position: "absolute",
                top: 80,
              }}
            >
              Edit Profile
            </Text>

            <Text
              style={{
                color: "#3E4685",
                fontFamily: "sans-serif-medium",
                fontSize: 20,
                fontWeight: "800",
                position: "absolute",
                top: 130,
                left: 50,
              }}
            >
              Name
            </Text>
            <View style={styles.Name}>
              <TextInput
                style={styles.TextInput}
                onChangeText={(text: string) => setNewName(text)}
                defaultValue={name}
              ></TextInput>
            </View>

            <Text
              style={{
                color: "#3E4685",
                fontFamily: "sans-serif-medium",
                fontSize: 20,
                fontWeight: "800",
                position: "absolute",
                top: 235,
                left: 50,
              }}
            >
              Bio
            </Text>
            <View style={styles.Bio}>
              <TextInput
                style={styles.TextInput}
                onChangeText={(text: string) => setNewBio(text)}
                defaultValue={bio}
              ></TextInput>
            </View>

            <Text
              style={{
                color: "#3E4685",
                fontFamily: "sans-serif-medium",
                fontSize: 20,
                fontWeight: "800",
                position: "absolute",
                top: 340,
                left: 50,
              }}
            >
              Income
            </Text>
            <View style={styles.Income}>
              <TextInput
                style={styles.TextInput}
                keyboardType="number-pad"
                onChangeText={(text: string) => setNewIncome(Number(text))}
                defaultValue={getAmount(income).toString()}
              ></TextInput>
            </View>

            <Text
              style={{
                color: "#3E4685",
                fontFamily: "sans-serif-medium",
                fontSize: 20,
                fontWeight: "800",
                position: "absolute",
                top: 455,
                left: 50,
              }}
            >
              Budget
            </Text>
            <View style={styles.Budget}>
              <TextInput
                style={styles.TextInput}
                keyboardType="number-pad"
                onChangeText={(text: string) => setNewBudget(Number(text))}
                defaultValue={getAmount(budget).toString()}
              ></TextInput>
            </View>

            <TouchableOpacity
              style={styles.saveInformation}
              onPress={() => saveUserInfo_Handler()}
            >
              <Text
                style={{
                  color: "#FFF",
                  fontFamily: "sans-serif-medium",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => closeActionSheet()}
            >
              <Text
                style={{
                  color: "#3E4685",
                  fontFamily: "sans-serif-medium",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ActionSheet>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F8FE",
    alignItems: "center",
    justifyContent: "center",
  },
  dp: {
    position: "absolute",
    top: 50,
    width: 91,
    height: 91,
    backgroundColor: "#fafafa",
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    width: Dimensions.get("window").width * 0.85,
    height: Dimensions.get("window").height * 0.44,
    position: "absolute",
    top: 50,
    borderRadius: 20,
    elevation: 20,
  },
  bottomInfo: {
    width: 260,
    height: 83,
    backgroundColor: "#FFFFFF",
    position: "absolute",
    bottom: 10,
  },
  divider: {
    height: 50,
    width: 2,
    backgroundColor: "#F1F1F1",
  },
  editBtn: {
    marginBottom: 250,
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    marginLeft: 240,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  ActionSheetContainer: {
    backgroundColor: "#F3F8FE",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height * 1.8,
    width: Dimensions.get("window").width,
    top: 0,
  },
  Name: {
    width: 270,
    height: 50,
    backgroundColor: "#F3F8FE",
    borderColor: "#3E4685",
    borderWidth: 2.2,
    borderRadius: 60,
    position: "absolute",
    top: 170,
    left: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  TextInput: {
    width: 270,
    height: 50,
    borderRadius: 60,
    paddingLeft: 20,
    paddingRight: 20,
  },
  Bio: {
    width: 270,
    height: 50,
    backgroundColor: "#F3F8FE",
    borderColor: "#3E4685",
    borderWidth: 2.2,
    borderRadius: 60,
    position: "absolute",
    top: 275,
    left: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  Income: {
    width: 270,
    height: 50,
    backgroundColor: "#F3F8FE",
    borderColor: "#3E4685",
    borderWidth: 2.2,
    borderRadius: 60,
    position: "absolute",
    top: 380,
    left: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  Budget: {
    width: 270,
    height: 50,
    backgroundColor: "#F3F8FE",
    borderColor: "#3E4685",
    borderWidth: 2.2,
    borderRadius: 60,
    position: "absolute",
    top: 495,
    left: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  saveInformation: {
    width: 150,
    height: 55,
    backgroundColor: "#3E4685",
    borderRadius: 50,
    bottom: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelBtn: {
    width: 150,
    height: 55,
    borderColor: "#3E4685",
    borderWidth: 2.2,
    borderRadius: 50,
    bottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

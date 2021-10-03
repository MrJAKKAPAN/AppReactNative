import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  CustomText,
  CustomTextBold,
  CustomTextBlue,
} from "../../../components/CustomText";
import { PrizeBox, PrizeThreeBox, PrizeLastTwoBox } from "./prizeBox";
import { SvgFromXml, SvgXml, Svg,Text as SvgText } from "react-native-svg";
import logoKSL from "../../../assets/images/logo";
import { getRoundDateString } from "../../../helpers/helperDateFormat";
import { LinearGradient } from "expo-linear-gradient";

export default function ShowWinningNumbers({ webConfig, prize }) {
  const lasRoundDate = getRoundDateString(webConfig.lastRoundDate);

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0.2, 0.5, 0.8]}
        colors={["#9fd9ff", "#d2edff", "#9fd9ff"]}
        style={styles.blueBox}
      >
        <SvgFromXml xml={logoKSL}></SvgFromXml>
        <CustomTextBlue style={{ marginTop: 15, fontSize: 24 }}>
          ผลรางวัลสลากกินแบ่งรัฐบาล
        </CustomTextBlue>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={[0.2, 0.5, 0.8]}
          colors={["#d4af37", "#fbe599", "#d5ab61"]}
          style={styles.goldBox}
        >
          <CustomTextBold style={{ fontSize: 19, color: "#473707" }}>
            งวดประจำวันที่ {lasRoundDate}
          </CustomTextBold>
        </LinearGradient>
        <PrizeBox prizeName={"รางวัลที่ 1"} winningNumber={prize.first[0]} />
        <View style={{ margin: 5 }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View style={{ width: "53%" }}>
            <PrizeThreeBox
              style={{ width: "100%" }}
              prizeName={"เลขหน้า 3 ตัว"}
              winningNumber={prize.first3Digits}
            />

            <View style={{ margin: 5 }} />
            <PrizeThreeBox
              style={{ width: "100%" }}
              prizeName={"เลขหน้า 3 ตัว"}
              winningNumber={prize.last3Digits}
            />
          </View>

          <View style={{ width: "42%" }}>
            <PrizeLastTwoBox
              style={{ fontSize: 80, letterSpacing: 4, margin: 0 }}
              prizeName={"เลขท้าย 2 ตัว"}
              winningNumber={prize.last2Digits[0]}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "100%",
    paddingTop: 0,
  },
  blueBox: {
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d2edff",
    padding: 15,
  },
  contianThreeAndTwoPrize: {
    flexDirection: "row",
    width: "100%",
  },
  contianThreePrize: {
    width: "50%",
  },
  textLastTwo: {
    flex: 1,
    justifyContent: "space-around",
    width: "100%",
    textAlign: "center",
    fontSize: 80,
    textAlignVertical: "center",
  },
  goldBox: {
    width: "95%",
    alignItems: "center",
    margin: 15,
    // backgroundColor: "#d4af37",
    paddingVertical: 13,
    borderRadius: 7,
  },
});

// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { CustomText, CustomTextBlue } from "../../../components/CustomText";
// import { PrizeBox, PrizeThreeBox, PrizeLastTwoBox } from "./prizeBox";
// import { SvgXml } from "react-native-svg";
// import logoKSL from "../../../assets/images/logo";

// export default function closeRound() {
//   const lastRoundDate = "16 เมษายน 2564 ";
//   const prizeName = "รางวัลที่ 1";
//   const WinningPrize = "100787";
//   const lastTwoDigits = "56";
//   const firstThree = ["013", "143"];
//   return (
//     <View style={styles.container}>
//       <View style={styles.blueBox}>
//         {/* <SvgXml xml={logoKSL} height={300} style={styles.lotteryLogo} /> */}
//         <CustomTextBlue>ผลรางวัลสลากกินแบ่งรัฐบาล</CustomTextBlue>
//         <CustomTextBlue>งวดประจำวันที่ {lastRoundDate}</CustomTextBlue>
//         <PrizeBox prizeName={prizeName} winningNumber={WinningPrize} />

//         <View style={{ margin: 5 }} />
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             width: "100%",
//           }}
//         >
//           <View style={{ width: "53%" }}>
//             <PrizeThreeBox
//               style={{ width: "100%" }}
//               prizeName={"เลขหน้า 3 ตัว"}
//               winningNumber={firstThree}
//             />

//             <View style={{ margin: 5 }} />
//             <PrizeThreeBox
//               style={{ width: "100%" }}
//               prizeName={"เลขหน้า 3 ตัว"}
//               winningNumber={firstThree}
//             />
//           </View>

//           <View style={{ width: "42%" }}>
//             <PrizeLastTwoBox
//               prizeName={"เลขท้าย 2 ตัว"}
//               winningNumber={lastTwoDigits}
//             />
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     margin: 20,
//     padding: 1,
//     width: "100%",

//     // alignItems: "center",
//   },
//   blueBox: {
//     marginTop: 15,
//     borderRadius: 7,
//     justifyContent: "center",
//     backgroundColor: "#d2edff",
//     paddingTop: 20,
//     padding: 15,
//   },
//   contianThreeAndTwoPrize: {
//     flexDirection: "row",
//     width: "100%",
//   },
//   contianThreePrize: {
//     width: "50%",
//   },
//   textLastTwo: {
//     flex: 1,
//     justifyContent: "space-around",
//     width: "100%",
//     textAlign: "center",
//     fontSize: 80,
//     textAlignVertical: "center",
//   },
// });

// {
//   /* <div>
//       <Header match={match} />
//       <div id="content" style={{ textAlign: 'center' }}>
//         <Timer dueDayFromConfig={webConfig.nextRound} />
//         {webConfig.liveScan &&  webConfig.liveScan !== "none" &&
//         <div className="sec-video" style={{ maxWidth: "500px", maxHeight: "281px", position: "relative",overflow:"hidden", paddingTop: "clamp(100px, 56.2%, 281px)", margin: "auto"}} >
//         <iframe
//           src={webConfig.liveScan}
//           width="500"
//           height="281"
//           style={{border:"none",
//             overflow:"hidden",
//             position: "absolute",
//             top: "0",
//             left: "0",
//             bottom: "0",
//             right: "0",
//           }}
//           scrolling="no"
//           frameborder="0"
//           allowfullscreen="true"
//           allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
//           allowFullScreen="true">
//         </iframe>
//         </div>
//         }
//         <h1>ลอตเตอรี่ออนไลน์ ซื้อเองง่าย จ่ายโดยรัฐบาล</h1>
//         <h1 className="text-blue">ราคา 80 บาท ไม่มีค่าบริการ</h1>
//         <h2 className="text-slogan">ลอตเตอรี่งวดวันที่ {lastRoundDate}</h2>

//         {!showPrize && renderCloseRound()}
//         {showPrize && (
//           <div className="sec-box sec-announce text-center">
//             <div className="logo">
//               <img src="img/logo.svg" width="220" height="27" alt="โลโก้ กองสลาก ดอท คอม" className="logo" />
//             </div>
//             <h2 className="sec-title">ผลรางวัลสลากกินแบ่งรัฐบาล</h2>

//             <div className="round">งวดประจำวันที่ {lastRoundDate}</div>

//             <div className="prize-1">
//               <h3>รางวัลที่ 1</h3>
//               <div className="bg">
//                 <b>{prizes.first}</b>
//               </div>
//             </div>

//             <div className="prize-2-3">
//               <div className="prize-3">
//                 <h3>เลขหน้า 3 ตัว</h3>
//                 <div className="bg">
//                   <b>{prizes.first3Digits && prizes.first3Digits[0]}</b>
//                   <i className="sep"></i>
//                   <b>{prizes.first3Digits && prizes.first3Digits[1]}</b>
//                 </div>
//                 <h3>เลขท้าย 3 ตัว</h3>
//                 <div className="bg">
//                   <b>{prizes.last3Digits && prizes.last3Digits[0]}</b>
//                   <i className="sep"></i>
//                   <b>
//                     <b>{prizes.last3Digits && prizes.last3Digits[1]}</b>
//                   </b>
//                 </div>
//               </div>

//               <div className="prize-2">
//                 <h3>เลขท้าย 2 ตัว</h3>
//                 <div className="bg">
//                   <b>{prizes.last2Digits && prizes.last2Digits[0]}</b>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div> */
// }
